#include <stdio.h>
#include <stdlib.h>


int main()
{
    FILE *f;
    f = fopen("/proc/stat", "r");
    size_t user, nice, system,idle; 
    if (f != NULL){
        int x = fscanf(f,"%*s %llu %llu %llu %llu",&user,&nice,&system,&idle);
        printf("nums = %d\n", x);
    }
    fclose(f);

    size_t p_total = user+nice+system+idle;
    size_t p_idle = idle;
    sleep(1);
    f = fopen("/proc/stat", "r");
    if (f != NULL){
        fscanf(f, "%*s %llu %llu %llu %llu",&user, &nice, &system, &idle);
    }
    fclose(f);

    double below = user+nice+system+idle - p_total;
    double above = idle - p_idle;
    printf("usage = %.2lf %%\n", (1 - above / below) * 100);

    return 0;
}
