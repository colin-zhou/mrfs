#include <time.h>
#include <json.h>
#include <string>
#include <stdio.h>
#include "json/json.h"

int main()
{
    int i;
    time_t start = clock();
    for(i = 0; i < 100; i++){
        Json::Value test;
        test["test"] = 100;
        test["care"] = 123.112;
    }
    time_t end = clock(); 
    printf("time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    start = clock();
    for(i = 0; i < 100; i++) {
        struct json_object *jobj = json_object_new_object();
        json_object_object_add(jobj, "test", json_object_new_int(100));
        json_object_object_add(jobj, "care", json_object_new_double(123.112));
        json_object_put(jobj);
    }
    end = clock();
    printf("time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    return 0;   
}
