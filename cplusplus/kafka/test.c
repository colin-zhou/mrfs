#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#include "kfk_inter.h"

void print_subs(const char *key, int klen, const char *payload, int plen)
{
    if (klen > 0) {
        printf("key %s\n", key);
    }
    if (plen > 0) {
        printf("payload %s\n", payload);
    }
}

int main(int argc, char **argv)
{
    kfk_p_init("127.0.0.1", NULL);
    kfk_str_send("test", 10, "helloworld what");
    char *cont = "test";
    char **topic = (char **) malloc(10 * sizeof(char *));
    topic[0] = cont;
    kfk_c_init("127.0.0.1", "test", 1, topic);
    for (int i = 0; i < 10; i++)
        kfk_poll(print_subs);
    kfk_destroy();
    if (topic) {
        free(topic);
    }
    return 0;
}
