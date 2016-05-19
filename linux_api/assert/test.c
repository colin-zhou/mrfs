#include <stdio.h>
#include <assert.h>
#include <math.h>
#include <stdlib.h>

double my_sqrt(double x)
{
    assert(x >= 0.0);
    return sqrt(x);
}



int main()
{
    printf("sqrt +2 = %g\n", my_sqrt(2.0));
    printf("sqrt -2 = %g\n", my_sqrt(-2.0));
    return 0;
}
