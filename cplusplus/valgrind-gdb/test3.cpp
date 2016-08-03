#include <stdlib.h>

int main(int argc, char *argv[]) {
    int *array = (int *)calloc(4096, sizeof(int));
    array[rand() % 4096] = 42;
    return 0;
}
