#include <stdlib.h>
#include <stdio.h>
#include <time.h>
#include <string.h>
#define SIZE 100

void tail(FILE *in, size_t n)
{
    int count = 0;
    char str[SIZE * 2];
    int pos;
    if (fseek(in, 0, SEEK_END)) {
        perror("fseek failed");
    } else {
        pos = ftell(in);
        while(pos) {
            if (!fseek(in, --pos, SEEK_SET)) {
                if (fgetc(in) == '\n') {
                    if (++count == n){
                        break;
                    }
                }
            } else {
                perror("fseek failed");
            }
        }
        printf("printing last %d lines\n", n);
        while(fgets(str,sizeof(str), in)) {
            printf("%s\n", str);
        }
        printf("\n\n");
    }   
}

int main()
{
    FILE *fp;
    char buffer[SIZE * 2];
    fp = fopen("input.txt", "wb");
    if (fp == NULL) {
        printf("fopen file input.txt failed");
        exit(EXIT_FAILURE);
    }
    srand(time(NULL));
    int idx, i;
    for (idx = 0; idx <= 10; idx++) {
        for (i = 0 ; i < SIZE-1; i++) {
            buffer[i] = rand() % 26 + 65; 
        }
        buffer[SIZE] = '\0';
        time_t ltime = time(NULL);
        char *date = asctime(localtime(&ltime));
        // replace '\n' with '\0'
        date[strlen(date) - 1] = '\0';
        fprintf(fp, "\nLine #%d [%s] - %s", idx, date, buffer );
        fflush(fp);
        tail(fp, idx);
        sleep(3);
    }
    return 0;
}
