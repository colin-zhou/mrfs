#include <string.h>
#include "kfk_inter.h"

static kafka_inst_t inst;

static void default_dr_cb(rd_kafka_t *rk, const rd_kafka_message_t *rkmessage, void *opaque)
{
    if (rkmessage->err)
        fprintf(stderr, "%% Message delivery failed: %s\n", rd_kafka_err2str(rkmessage->err));
    else
        fprintf(stderr, "%% Message delivered (%zd bytes, partition %"PRId32")\n", rkmessage->len, rkmessage->partition);
    /* The rkmessage is destroyed automatically by librdkafka */
}

int kfk_c_init(const char *brokers, const char *groupid, int topic_cnt, char **topics)
{
    char errstr[512];        /* librdkafka API error reporting buffer */
    rd_kafka_resp_err_t err;
    rd_kafka_topic_partition_list_t *subscription; /* Subscribed topics */
    inst.conf = rd_kafka_conf_new();
    /* Set bootstrap broker(s) as a comma-separated list of
     * host or host:port (default port 9092).
     * librdkafka will use the bootstrap brokers to acquire the full
     * set of brokers from the cluster. */
    if (rd_kafka_conf_set(inst.conf, "bootstrap.servers", brokers, errstr, sizeof(errstr)) != RD_KAFKA_CONF_OK) {
        fprintf(stderr, "%s\n", errstr);
        rd_kafka_conf_destroy(inst.conf);
        return 1;
    } 
    /* Set the consumer group id.
     * All consumers sharing the same group id will join the same
     * group, and the subscribed topic' partitions will be assigned
     * according to the partition.assignment.strategy
     * (consumer config property) to the consumers in the group. */
    if (rd_kafka_conf_set(inst.conf, "group.id", groupid, errstr, sizeof(errstr)) != RD_KAFKA_CONF_OK) {
        fprintf(stderr, "%s\n", errstr);
        goto failed;
    }
    /* If there is no previously committed offset for a partition
     * the auto.offset.reset strategy will be used to decide where
     * in the partition to start fetching messages.
     * By setting this to earliest the consumer will read all messages
     * in the partition if there was no previously committed offset. */
    if (rd_kafka_conf_set(inst.conf, "auto.offset.reset", "earliest", errstr, sizeof(errstr)) != RD_KAFKA_CONF_OK) {
        fprintf(stderr, "%s\n", errstr);
        goto failed;
    }

    inst.rkc = rd_kafka_new(RD_KAFKA_CONSUMER, inst.conf, errstr, sizeof(errstr));
    if (!inst.rkc) {
        fprintf(stderr, "%% Failed to create new consumer: %s\n", errstr);
        goto failed;
    }

    inst.conf = NULL; /* Configuration object is now owned, and freed,
                      * by the rd_kafka_t instance. */

    /* Redirect all messages from per-partition queues to
     * the main queue so that messages can be consumed with one
     * call from all assigned partitions.
     *
     * The alternative is to poll the main queue (for events)
     * and each partition queue separately, which requires setting
     * up a rebalance callback and keeping track of the assignment:
     * but that is more complex and typically not recommended. */
    rd_kafka_poll_set_consumer(inst.rkc);

    /* Convert the list of topics to a format suitable for librdkafka */
    subscription = rd_kafka_topic_partition_list_new(topic_cnt);
    printf("the cnt is %d\n", topic_cnt);
    for (int i = 0 ; i < topic_cnt ; i++) {
        printf("the key is %s\n", topics[i]);
        rd_kafka_topic_partition_list_add(subscription, topics[i], RD_KAFKA_PARTITION_UA);
    }

    /* Subscribe to the list of topics */
    err = rd_kafka_subscribe(inst.rkc, subscription);
    rd_kafka_topic_partition_list_destroy(subscription);
    if (err) {
            fprintf(stderr, "%% Failed to subscribe to %d topics: %s\n", subscription->cnt, rd_kafka_err2str(err));
            goto failed;
    }
    return 0;

failed:
    if(inst.rkc)
        rd_kafka_destroy(inst.rkc);
    if(inst.conf)
        rd_kafka_conf_destroy(inst.conf);
    return 1;
}

int kfk_p_init(const char *brokers, dr_cb_f func)
{
    if (func == NULL) {
        func = default_dr_cb;
    }
    char errstr[512];
    inst.conf = rd_kafka_conf_new();
    /* Set bootstrap broker(s) as a comma-separated list of
     * host or host:port (default port 9092).
     * librdkafka will use the bootstrap brokers to acquire the full
     * set of brokers from the cluster. */
    if (rd_kafka_conf_set(inst.conf, "bootstrap.servers", brokers, errstr, sizeof(errstr)) != RD_KAFKA_CONF_OK) {
        fprintf(stderr, "%s\n", errstr);
        rd_kafka_conf_destroy(inst.conf);
        return 1;
    } 
 
    rd_kafka_conf_set_dr_msg_cb(inst.conf, func);
    inst.rkp = rd_kafka_new(RD_KAFKA_PRODUCER, inst.conf, errstr, sizeof(errstr));

    if (!inst.rkp) {
        fprintf(stderr, "%% Failed to create new producer: %s\n", errstr);
        return 1;
    }
    return 0;
}

int kfk_bin_send(const char *topic, int type, int size, void *buf)
{
    if (!inst.rkp) {
        fprintf(stderr, "environment not prepared!!!\n");
        return -1;
    }
    int retry_cnt = 0;
    /* copy data into payload */
    char payload[2048];
    bin_data_t *tmp = (bin_data_t *)payload;
    tmp->type = type;
    tmp->size = size;
    memcpy(tmp->data, buf, size);
    rd_kafka_resp_err_t err;
    // take type & size into account
    size += sizeof(int) * 2;
retry:
    err = rd_kafka_producev(inst.rkp, RD_KAFKA_V_TOPIC(topic),
            /* Make a copy of the payload. */
            RD_KAFKA_V_MSGFLAGS(RD_KAFKA_MSG_F_COPY),
            /* Message value and length */
            RD_KAFKA_V_VALUE(payload, size),
            /* Per-Message opaque, provided in
             * delivery report callback as
             * msg_opaque. */
            RD_KAFKA_V_OPAQUE(NULL),
            /* End sentinel */
            RD_KAFKA_V_END);
    if (err) {
        /*
         * Failed to *enqueue* message for producing.
         */
        fprintf(stderr, "%% Failed to produce to topic %s: %s\n", topic, rd_kafka_err2str(err));
        if (err == RD_KAFKA_RESP_ERR__QUEUE_FULL) {
            /* If the internal queue is full, wait for
             * messages to be delivered and then retry.
             * The internal queue represents both
             * messages to be sent and messages that have
             * been sent or failed, awaiting their
             * delivery report callback to be called.
             *
             * The internal queue is limited by the
             * configuration property
             * queue.buffering.max.messages */
            rd_kafka_poll(inst.rkp, 1000/*block for max 1000ms*/);
            if (++retry_cnt < KFK_PRODUCER_RETRY)
                goto retry;
            return -2;
        }
    } else {
        fprintf(stderr, "%% Enqueued message (%zd bytes) for topic %s\n", size, topic);
    }
    rd_kafka_poll(inst.rkp, 0/*non-blocking*/);
    return 0;
}

int kfk_str_send(const char *topic, int size, char *buf)
{
    if (!inst.rkp) {
        fprintf(stderr, "environment not prepared!!!\n");
        return -1;
    }
    if (0 == size) {    
        rd_kafka_poll(inst.rkp, 0);
        return 0;
    }
    int retry_cnt = 0;
    rd_kafka_resp_err_t err;
retry:
    err = rd_kafka_producev(inst.rkp, RD_KAFKA_V_TOPIC(topic), RD_KAFKA_V_MSGFLAGS(RD_KAFKA_MSG_F_COPY),
                            RD_KAFKA_V_VALUE(buf, size), RD_KAFKA_V_OPAQUE(NULL), RD_KAFKA_V_END);
    if (err) {
        fprintf(stderr, "%% Failed to produce to topic %s: %s\n", topic, rd_kafka_err2str(err));
        if (err == RD_KAFKA_RESP_ERR__QUEUE_FULL) {
            rd_kafka_poll(inst.rkp, 1000/*block for max 1000ms*/);
            if (++retry_cnt <= KFK_PRODUCER_RETRY)
                goto retry;
            return -2;
        }
    } else {
        fprintf(stderr, "%% Enqueued message (%zd bytes) for topic %s\n", size, topic);
    }
    rd_kafka_poll(inst.rkp, 0/*non-blocking*/);
    return 0;
}

int kfk_poll(cr_cb_f hdlf)
{
    int cnt = 0;
    while (1) {
        rd_kafka_message_t *rkm;
        /* Timeout: no message within 1000ms */
        rkm = rd_kafka_consumer_poll(inst.rkc, 100);
        if (!rkm)
            break;
        /* consumer_poll() will return either a proper message
         * or a consumer error (rkm->err is set). */
        if (rkm->err) {
            /* Consumer errors are generally to be considered
             * informational as the consumer will automatically
             * try to recover from all types of errors. */
            fprintf(stderr, "%% Consumer error: %s\n", rd_kafka_message_errstr(rkm));
            rd_kafka_message_destroy(rkm);
            continue;
        }
        /* Proper message. */
        printf("Message on %s [%"PRId32"] at offset %"PRId64":\n",
               rd_kafka_topic_name(rkm->rkt), rkm->partition,
               rkm->offset);
        cnt += 1;
        if (hdlf) {
            hdlf(rkm->key, rkm->key_len, rkm->payload, rkm->len); 
        }
        rd_kafka_message_destroy(rkm);
    }
    return cnt;
}

int kfk_destroy()
{
    if (inst.rkp) {
        /* try to flush before we exit */
        rd_kafka_flush(inst.rkp, 5 * 1000 /* wait for max 5 seconds */);
        if (rd_kafka_outq_len(inst.rkp) > 0) {
            fprintf(stderr, "%% %d message(s) were not delivered\n", rd_kafka_outq_len(inst.rkp));
            return -1;
        }
        rd_kafka_destroy(inst.rkp);
    }
    if (inst.rkc) {
        fprintf(stderr, "%% Closing consumer\n");
        rd_kafka_consumer_close(inst.rkc);
        rd_kafka_destroy(inst.rkc);
    }
    return 0;
}
