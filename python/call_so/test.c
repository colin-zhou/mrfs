#include <stdio.h>
#include <string.h>


int show()
{
    printf("this is a test");
    return 0;
}

int add(int a, int b)
{
    return a+b;
}

typedef struct {
    int abc;
    char x[20];
}abc;


typedef void(*test_hdl)(abc *td);

int wrap_function(test_hdl thdl, abc *hh)
{
    printf("c api: abc=%d, x=%s\n", hh->abc, hh->x);
    hh->abc += 1;
    strncpy(hh->x, "my change", sizeof(hh->x));
    thdl(hh);
    return 0; 
}
