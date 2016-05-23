#include <stdio.h>
#include <sys/time.h>

void
long2timespec(long nano_secs_from_epoch, struct timespec *t)
{
        ASSERT(t);
        if(!t) {
                return;
        }
        t->tv_sec = nano_secs_from_epoch/((long)1e6);
        t->tv_nsec = (nano_secs_from_epoch%((long)1e6))*((long)1e3);
}

int main()
{
	long x = 1461138648944677175;
	
}