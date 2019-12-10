#ifndef __KFK_INTER_H__
#define __KFK_INTER_H__

#include <librdkafka/rdkafka.h>


typedef void (*dr_cb_f)(rd_kafka_t *rk, const rd_kafka_message_t *rkmessage, void *opaque);
typedef void (*cr_cb_f)(const char *key, int key_len, const char *payload, int len);

#define KFK_PRODUCER_RETRY (5)

#pragma pack(push, 8)
/* desc the bin sending data */
typedef struct{
    int type;
    int size;
    char data[0];
} bin_data_t;

typedef struct {
    rd_kafka_t *rkp;          /* Producer instance handle */
    rd_kafka_t *rkc;          /* Customer instance handle */
    rd_kafka_conf_t *conf;   /* Temporary configuration object */
} kafka_inst_t;

#pragma pack(pop)

#ifdef __cplusplus
extern "C" {
#endif

/* init the kafka customer ctx */
int kfk_c_init(const char *brokers, const char *groupid, int topic_cnt, char **topics);

/* init the kafka producer broker addrs and deliver callback function */
int kfk_p_init(const char *brokers, dr_cb_f func);

/* poll the customer and deal with specify function */
int kfk_poll(cr_cb_f func);

/* send binary data to kafka queue */
int kfk_bin_send(const char *topic, int type, int size, void *buf);

/* send string message to kafka queue */
int kfk_str_send(const char *topic, int size, char *buf);

/* destroy the kafka connection */
int kfk_destroy();

#ifdef __cplusplus
}
#endif

#endif // __KFK_INTER_H__
