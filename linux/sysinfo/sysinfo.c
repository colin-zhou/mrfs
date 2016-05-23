#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/sysinfo.h>
#include <time.h>

static int num_n;
inline static float
normalize_loadrate(unsigned long load)
{
#if !defined(FSHIFT)
#define FSHIFT 16              /* nr of bits of precision */
#endif
    long part_int = (load>>FSHIFT);
    /* Keep 3 significant digitals after decimal point. */
    float part_frac= ((load &((1UL<<FSHIFT)-1))*1000)>>FSHIFT;
    float load_rate =  part_int + part_frac/1000;
    printf("one before %lf\n", load_rate);
    if(num_n > 0) {
            load_rate /= num_n;
    }
    return load_rate;
}

void origin_method()
{
    clock_t tt = clock();
    struct sysinfo info;
    if (sysinfo(&info) == -1) {
        printf("could not get sysinfo\n");
        return;
    }
    double x[3];
    int i;
    for (i = 0; i < 3; i++) {
        x[i] = normalize_loadrate(info.loads[i]);
    }
    double td = clock() - tt;
    printf("original method take %lf cpu clock\n", td);
    printf("load percentage: %.2f, %.2f, %.2f\n", x[0], x[1],x[2]);
}

int main(int argc, char **argv) {
    struct sysinfo info;
    if (sysinfo(&info) == -1) {
        printf("could not get sysinfo\n");
        return 1;
    }
    double av1, av2, av3;
    double shift = (1 << SI_LOAD_SHIFT);
    clock_t t = clock();
    // outside method
    num_n = sysconf(_SC_NPROCESSORS_CONF);

    printf("core nums of the compute is %d\n", num_n);
    
    av1 = info.loads[0] / shift;
    av2 = info.loads[1] / shift;
    av3 = info.loads[2] / shift;
    double x = (clock() - t);
    printf("method1: time takes %lf cpu clock\n", x);
    printf("load average: %.2f, %.2f, %.2f\n", av1, av2, av3);

    // read from api
    double load[3];
    t = clock();
    if(getloadavg(load, 3) != -1) {
        x = (clock() - t);
        printf("method2: time task %lf cpu clock\n", x);
        printf("load average: %.2f, %.2f, %.2f\n", load[0],load[1],load[2]);
    }
    // read from file
    FILE *f;
    t = clock();
    f = fopen("/proc/loadavg", "r");
    if (f != NULL){
        int n = fscanf(f, "%lf %lf %lf", &load[0], &load[1], &load[2]);
        x = (clock() - t);
        printf("method3: time takes %lf cpu clock\n", x);
        printf("load average: %.2f, %.2f, %.2f\n", load[0],load[2],load[2]);
    }
    origin_method();
    return 0;
}
