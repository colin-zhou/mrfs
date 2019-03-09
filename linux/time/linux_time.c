#include <stdio.h>
#include <time.h>


/**
 * time function
 * time_t time(time_t *calptr)
 * return seconds
 **/
void print_time()
{
    time_t now;
    time(&now); // now = time(NULL)
    printf("now time is %d\n", now);
}

/**
 * struct tm * localtime(const time_t *calptr);
 **/
void print_tm_time()
{
    time_t now;
    time(&now);
    struct tm *x;
    x = localtime(&now);
    printf("tm_sec %d, tm_min %d, tm_hour %d, tm_mday %d, tm_mon %d, tm_year %d, tm_wday %d, tm_yday %d, tm_isdst %d\n", 
    x->tm_sec, x->tm_min, x->tm_hour, x->tm_mday, x->tm_mon+1, x->tm_year+1900, x->tm_wday, x->tm_yday, x->tm_isdst);
}

/**
 * struct tm * gmtime(clock *clock)
 * convert tdate & time to gmt time, return tm is utc
 **/
void print_gmttime()
{
    time_t now;
    struct tm *gmt, *area;
    tzset();
    time(&now);
    area = localtime(&now);
    printf("local time is : %s", asctime(area));
    gmt = gmtime(&now);
    printf("gmt is: %s", asctime(gmt));
}


/**
 * time_t mktime(struct tm * timeptr);
 * tm-> utc time seconds
 */
void print_mktime()
{
    time_t now;
    struct tm *p;
    time(&now);
    printf("time %d\n", now);
    p = localtime(&now);
    now = mktime(p);
    printf("time->localtime->mktime %d\n", now); 
}

/**
 * char *asctime(const struct tm *tblock);
 * convert tm date to string
 **/
void print_asctime()
{
    time_t t;
    struct tm *p;
    t = time(NULL);
    p = localtime(&t);
    printf("%s\n", asctime(p));
}

int main(int argc, char *argv[])
{
    print_time();
    print_tm_time();
    print_mktime();
    print_gmttime();
    print_asctime();
    return 0;
}
