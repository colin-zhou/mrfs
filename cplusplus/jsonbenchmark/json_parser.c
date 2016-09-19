/*
 * A simple example of json string parsing with json-c.
 *
 * clang -Wall -g -I/usr/include/json-c/ -o json_parser json_parser.c -ljson-c
 */
#include <json.h>
#include <stdio.h>
#include <time.h>

int main() {
    char str[65536];

	struct json_object *jobj;
    FILE *fp = fopen("test.json", "rb");
    fread(str, 1, 65536, fp);

    int i;
    time_t start = clock();
	jobj = json_tokener_parse(str);

    for (i = 0; i < 100; i++) {
	    json_object_to_json_string_ext(jobj, 0);
    }

    time_t end = clock();

    printf("time consumed is %lf ms\n", (end-start) * 1000.0 / CLOCKS_PER_SEC);

    fclose(fp);

	return 0;
}
