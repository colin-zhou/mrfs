#include <stdlib.h>
#include <string.h>


int main(int argc, char *argv[]) {
    char *lost = strdup("catch me if you can!");
    lost = NULL;
    strdup("foobar");
    return 0;
}
