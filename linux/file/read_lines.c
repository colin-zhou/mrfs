#include <stdio.h>
#include <stdlib.h>


void
read_line_by_line(const char *filename)
{
    char line[1024];
    FILE *f;
    f = fopen(filename, "r");
    if (f == NULL) {
        perror("fopen failed");
        return;
    }
    while(fgets(line, sizeof(line), f) != NULL) {
        printf("the line: %s\n", line);
    }
    if (f != NULL) {
        fclose(f);
    }
}

int main()
{
    read_line_by_line("test.a");
}
