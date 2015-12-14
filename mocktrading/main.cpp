#include "mocktrading.h"
#include <iostream>
#include <hiredis/hiredis.h>
#include <fstream>
#include <time.h>
#include <unistd.h>

using namespace std;


int main()
{
    clock_t start, end;
    double cpu_time_used;
    
    redisContext u;
    redisContext *pp = &u;

    const char *trader_ip = "127.0.0.1";
    int trader_port = 65530;
    const char *quote_file = "/mnt/data/DataMap/rss_file_path.txt";
    const char *delta_file = "/mnt/data/DataMap/curr_rss_file_path.txt";
    const char *trader_path = "/opt/trader";
    const char *agent = "192.168.1.1(tr1)";

    // ret = init_mock_trading(quote_file, trader_ip, trader_port);

    Json::Value root;   // will contains the root value after parsing.
    Json::Reader reader;
    // std::ifstream test("test.rc", std::ifstream::binary);
    // std::ifstream test("stop.rc", std::ifstream::binary);
    std::ifstream test("read.rc", std::ifstream::binary);

    bool parsingSuccessful = reader.parse( test, root, false );

    // start_mock_trading(pp, root);
    // stop_mock_trading(pp, root);

    start = clock();
    read_mock_trading(pp, root);
    end = clock();

    cpu_time_used = ((double) (end - start)) / CLOCKS_PER_SEC * 1000;
    printf("execute time = %lf ms\n", cpu_time_used);
    return 0;
}