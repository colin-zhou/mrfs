#include <stdlib.h>
#include <time.h>


int myrandom()
{
    srand(time(NULL));
//return rand() % 2;
    return 1;
}
