#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

struct s_a {
    char c;
    int i;
};

int main(int argc, char *argv[]) {
    struct s_a *a = (struct s_a*)malloc(sizeof(struct s_a));
    int fd = open("/dev/null", O_APPEND|O_WRONLY);
    a->c = 'c';
    a->i = 42;
    write(fd, a, sizeof(*a));
    close(fd);
    return 0;
}
