#include <stdio.h>
#include <time.h>
#include <string.h>
#include <stdlib.h>

/**
 * str2clock
 * time_str -> hour:min:sec:millisec 
 * 
 */

// struct timespec{
// 	time_t  tv_sec;   /* seconds */
// 	long    tv_nsec   /* nanoseconds */
// };
// 
//  time_t time(time_t *t)
//  time() returns the time as the number of seconds since the Epoch, 1970-01-01 00:00:00 +0000 (UTC).
//  if t is non-NULL, the return value is also stored in the memory pointed to by t

int 
str2clock(const char *time_str, struct timespec *spec)
{
        if(!time_str || !spec){
                return -1;
        }

	int hour, min, sec, millisec;
	int ret = sscanf(time_str, "%d:%d:%d.%d",
					 &hour, &min, &sec, &millisec);

	if(ret <4)
	{
		return -2;
	}
	// typedef long time_t
	time_t now;

 // struct tm {
 //               int tm_sec;    /* Seconds (0-60) */
 //               int tm_min;    /* Minutes (0-59) */
 //               int tm_hour;   /* Hours (0-23) */
 //               int tm_mday;   /* Day of the month (1-31) */
 //               int tm_mon;    /* Month (0-11) */
 //               int tm_year;   /* Year - 1900 */
 //               int tm_wday;   /* Day of the week (0-6, Sunday = 0) */
 //               int tm_yday;   /* Day in the year (0-365, 1 Jan = 0) */
 //               int tm_isdst;  /* Daylight saving time */
 //        };

	struct tm  tm_t;
	bzero(&tm_t, sizeof(tm_t));
	time(&now);
	localtime_r(&now, &tm_t);

	tm_t.tm_hour = hour;
	tm_t.tm_min = min;
	tm_t.tm_sec = sec;

	spec->tv_sec = mktime(&tm_t);
	spec->tv_nsec = millisec*1e6;

        return 0;
}

int main()
{
	struct timespec abc;
	char x[] = "12:30:30:40";
	// str2clock(x, &abc);
	time_t now;
	struct tm  tm_t;
	bzero(&tm_t, sizeof(tm_t));
	time(&now);
	localtime_r(&now, &tm_t);
	printf("%s\n", asctime(&tm_t));
	return 0;
}