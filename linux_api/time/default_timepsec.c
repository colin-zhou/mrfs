#include <stdio.h>
#include <time.h>

int main()
{
    static struct timespec now, t;
    printf("%lld.%.9ld\n", now.tv_sec, now.tv_nsec);
    clock_gettime(CLOCK_REALTIME, &t);
    now = t;
    printf("%lld.%.9ld\n", now.tv_sec, now.tv_nsec);
    return 0;
}
