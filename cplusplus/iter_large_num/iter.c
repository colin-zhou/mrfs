#include <stdio.h>
#include <sys/time.h>
#include <stdint.h>
#include <string.h>

int main()
{
    struct timeval a, b;
    struct timezone c;
    uint64_t t1, t2;
    gettimeofday(&a, &c);
    int j = 0;
    for (int i = 0; i < 100000000; i++){
        strcmp("abcefg", "hahahah1");
        strcmp("abcefg", "hahahah2");
        //strcmp("abcefg", "hahahah3");
        //strcmp("abcefg", "hahahah4");
        //strcmp("abcefg", "hahahah5");
        //strcmp("abcefg", "hahahah2");
        //strcmp("abcefg", "hahahah3");
        //strcmp("abcefg", "hahahah4");
        //strcmp("abcefg", "hahahah5");
        j++;
    }
    gettimeofday(&b, &c);
    t1 = b.tv_sec * 1e6 + b.tv_usec;
    t2= a.tv_sec * 1e6 + a.tv_usec;
    printf("time consumption: %llu us\n", t1 - t2);
    return 0;
}
