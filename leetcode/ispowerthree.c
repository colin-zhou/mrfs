#include <stdio.h>
#include <math.h>

int
is_power_of_three(int n)
{
    if(n % 2 == 0) {
        return 0;
    }
     
}

int main()
{
    int  n = 3;
    int i = 1;
    while(n > 0) {
       n =  n*3;
       printf("n = %d\n", n);
       i++;
    }
    return 0;
}
