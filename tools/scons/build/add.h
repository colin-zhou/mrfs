#ifndef ADD_H_
#define ADD_H_

#ifdef UNIT_TEST
    #define STATIC
#else
    #define STATIC static 
#endif

#ifdef __cplusplus
extern "C" {
#endif

//int cacl(int i1, int i2);
int add(int i1, int i2);

#ifdef __cplusplus
}
#endif

#endif
