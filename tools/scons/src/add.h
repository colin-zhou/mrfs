#ifndef ADD_H_
#define ADD_H_

#ifdef UNIT_TEST
    #define STATIC
#else
    #define STATIC static 
#endif


int cacl(int i1, int i2);
//int add(int i1, int i2);

#endif
