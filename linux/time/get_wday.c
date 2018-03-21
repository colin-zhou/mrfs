#include <time.h>
#include <stdio.h>

int main()
{
    time_t rawtime;
    struct tm * timeinfo;
    time(&rawtime);
    timeinfo = localtime(&rawtime);
    int wday = timeinfo->tm_wday;
    int hour = timeinfo->tm_hour;
    printf("the wday is: %d, hour is %d\n", wday, hour);
}
