#include <time.h>
#include <json.h>
#include <string>
#include <iostream>
#include <stdio.h>
#include "json/json.h" 

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
    printf("time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);
    
    start = clock();
    struct json_object *jobj = json_tokener_parse(str);
    for (i = 0; i < 100; i++) {
        json_object_to_json_string_ext(jobj, 0);
    }

    end = clock();
    printf("time consumed is %lf\n", (end - start) * 1000.0 / CLOCKS_PER_SEC);

    fclose(fp);
    return 0;
}
