#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "hiredis.h"


int
pro_query_redis_reply(redisReply *r, char **redis_str)
{ 
    int ret = -1;
    if (!r) {
        printf("fetch from redis failed\n"); 
    } else if (r->type == REDIS_REPLY_STRING) {
        strcpy(*redis_str, r->str);
        ret = 0;
    } else if (r->type == REDIS_REPLY_NIL) {
        printf("fetch_config_from_redis return nil\n");
        ret = -1;
    } else {
        printf("query redis return unknown type=%d, str=%s",
                r->type, r->str);
        ret = -2;
    }
    freeReplyObject(r);
    return ret;
}

int
pro_write_redis_reply(redisReply *r, int *redis_int)
{
    int ret = -1;
    if (!r) {
        printf("write redis return failed\n");
        ret = -1;
    } else if(r->type == REDIS_REPLY_INTEGER) {
        *redis_int = r->integer;
        ret = 0;
    } else if(r->type == REDIS_REPLY_NIL) {
        printf("write redis return nil\n");
        ret = -1;
    } else {
        printf("write redis return unknown type=%d, int=%d",
               r->type, r->integer);
        ret = -2;
    }
    freeReplyObject(r);
    return ret;
}

void usage()
{
    printf("./abc {send, recv}\n");
    exit(0);
}

int cmd_parse(int argc, char **argv)
{
    if (argc == 2) {
        if (strcmp(argv[1], "send") == 0) {
            return 0;
        } else if (strcmp(argv[1], "recv") == 0) {
            return 1;
        }
    }
    usage();
}


int main(int argc, char **argv)
{
    int ret, tval;
    int task = cmd_parse(argc, argv);

    redisContext *c = redisConnect("127.0.0.1", 6379);
    if (c == NULL || c->err) {
        if (c) {
            printf("Error: %s\n", c->errstr);
            // handle error
        } else {
            printf("Can't allocate redis context\n");
        }
        exit(1);
    }

    char *tmp_buf = (char *)malloc(sizeof(char) * 2048);
    if (tmp_buf == NULL) {
        perror("malloc failed");
        exit(1);
    }

    redisReply *r;
    if (task == 1) {
        // read a task from task queue a:rss:cmd
        r = (redisReply *)redisCommand(c, "rpop a:rss:cmd");
        ret = pro_query_redis_reply(r, &tmp_buf);
        if (ret == 0) {
            printf("recv task: %s\n", tmp_buf);
        }
    } else {
        strcpy(tmp_buf, "{\"abc\": \"123\"}");
        // write dumped json string to redis result queue a:rss:rsp
        r = (redisReply *)redisCommand(c, "rpush a:rss:rsp %s", tmp_buf);
        ret = pro_write_redis_reply(r, &tval);
        if (ret == 0 && tval == 1) {
            printf("write redis ret=%d\n", tval);
        }
    }

    if (tmp_buf) {
        free(tmp_buf);
    }
    if (c) {
        redisFree(c);
    }
    return 0;
}
