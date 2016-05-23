#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <time.h>

int main()
{
    double a[3];
    clock_t t;
    t = clock();
    getloadavg(a, 3);
    t = clock() - t;
    long cpu_nums = sysconf(_SC_NPROCESSORS_CONF);
    double time_taken = ((double) t)/CLOCKS_PER_SEC;
    printf("used seconds = %lf\n", time_taken);
    printf("%lf %lf %lf\n", a[0]/cpu_nums, a[1]/cpu_nums,a[2]/cpu_nums);
}
