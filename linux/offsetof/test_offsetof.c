#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>

int
main(void)
{
    struct s {
        int i;
        char c;
        double d;
        char *a;
    } test;

    /* Output is compiler dependent */
    char he[] = "aaaaaa";
    test.i = 100;
    test.c = 'h';
    test.a = he;

    struct s *tmp =(struct s *)((void *)&test.a - offsetof(struct s, a));
    printf("the right value i= %d, c=%c\n", tmp->i, tmp->c);

    printf("offsets: i=%zd; c=%zd; d=%zd a=%zd\n",
            offsetof(struct s, i), offsetof(struct s, c),
            offsetof(struct s, d), offsetof(struct s, a));
    printf("sizeof(struct s)=%zd\n", sizeof(struct s));

    exit(EXIT_SUCCESS);
}
