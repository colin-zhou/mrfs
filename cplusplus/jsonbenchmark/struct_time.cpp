#include <time.h>
//#include <json.h>
#include <string>
#include <stdio.h>
#include "json/json.h"
//#include <u/libu.h>
//#include <wjelement.h>
//#include "parson.h"
#include <jansson.h>

//int facility = LOG_LOCAL0;

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
    printf("jsoncpp time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    /*
    start = clock();
    for(i = 0; i < 100; i++) {
        struct json_object *jobj = json_object_new_object();
        json_object_object_add(jobj, "test", json_object_new_int(100));
        json_object_object_add(jobj, "care", json_object_new_double(123.112));
        json_object_put(jobj);
    }
    end = clock();
    printf("json-c time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    */
    /*
    start = clock();
    for (i = 0; i < 100; i++) {
        u_json_t *root = NULL, *tmp = NULL;
        u_json_new_object(NULL, &root);
        u_json_new_int("test", 100, &tmp);
        u_json_add(root, tmp);
        tmp = NULL;
        u_json_new_real("care", 123.112, &tmp);
        u_json_add(root, tmp);
        tmp = NULL; 
        root = NULL;
    }
    end = clock();
    printf("libu time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);

    WJElement doc = NULL;
    start = clock();
    for (i = 0; i < 100; i++) {
        doc = WJEObject(NULL, NULL, WJE_NEW);
        WJEInt32(doc, "test", WJE_SET, 100);
        WJEDouble(doc, "care", WJE_SET, 123.112);
    } 
    end = clock();
    printf("wjelement time sonsumed is %lf\n", (end- start) * 1000.0 / CLOCKS_PER_SEC);
    */

    /*
    JSON_Value *a = NULL;
    start = clock();
    for (i = 0; i < 100; i++) {
        json_object_set_number(json_object(a), "test", 25);
        json_object_set_number(json_object(a), "care", 123.112);
        json_value_free(a);
        a = NULL;
    }
    end = clock();
    printf("parson time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    */

    json_t *obj = json_object();
    start = clock();
    for (i = 0; i < 100; i++) {
        json_object_set(obj, "test", json_integer(25));
        json_object_set(obj, "care", json_real(123.112));
        json_object_clear(obj);
    }
    end = clock();
    printf("jansson time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    return 0; 
}
