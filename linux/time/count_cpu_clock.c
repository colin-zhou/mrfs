#include <time.h>
#include <stdio.h>


int main()
{
    clock_t t = clock();
    printf("hello world\n");
    double seconds = (double) (clock() - t) / CLOCKS_PER_SEC;
    printf("total seconds = %lf\n", seconds);
}
