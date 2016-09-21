#include <time.h>
//#include <json.h>
#include <string>
#include <iostream>
#include <stdio.h>
//#include <u/libu.h>
#include "json/json.h" 
//#include <wjelement.h>
//#include "parson.h"
#include <jansson.h>

//int facility = LOG_LOCAL0;

int main()
{
    char str[65536];
    FILE *fp = fopen("test.json", "rb");
    fread(str, 1, 65536, fp);

    std::string strValue(str);

    Json::Reader reader;
    Json::FastWriter writer;
    Json::Value value;

    time_t start = clock();
    int i;

    if (reader.parse(strValue, value)) {
        for (i = 0; i < 100; i++) {
            {   
                std::string json_file = writer.write(value);
            } 
        }
    }
    time_t end = clock();
    printf("jsoncpp time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    /*
    start = clock();
    struct json_object *jobj = json_tokener_parse(str);
    for (i = 0; i < 100; i++) {
        json_object_to_json_string_ext(jobj, 0);
    }
    end = clock();
    printf("json-c time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    */

    /*
    u_json_t *jo = NULL;
    start = clock();
    for (i = 0; i < 100; i++) {
        u_json_decode(str, &jo);
    }
    end = clock();
    printf("libu time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);

    start = clock();
    for (i = 0; i < 100; i++) {
        WJReader doc = WJROpenMemDocument(str, NULL, 0);
        WJElement json = WJEOpenDocument(doc, NULL, NULL, NULL);
    }
    end = clock();
    printf("wjelement time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    */
    /*
    start = clock();
    for (i = 0; i < 100; i++) {
        json_parse_string(str);
    }
    end = clock();
    printf("parson time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    */
    
    start = clock();
    for (i = 0; i < 100; i++) {
        json_t *root;
        json_error_t error;
        root = json_loads(str, 0, &error);
    }
    end = clock();
    printf("jansson time consumed is %lf\n", (end -start) * 1000.0 / CLOCKS_PER_SEC);

    fclose(fp);
    return 0;
}
