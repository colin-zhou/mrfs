#include <stdio.h>
#include <unistd.h>
#include <pthread.h>

#define MAXNITEMS 100000
#define MAXNTHREADS 10

int nitems = MAXNITEMS;
int buff[MAXNITEMS];

struct val {
    pthread_mutex_t mutex;
    int nput;
    int nval;
} put = {
    PTHREAD_MUTEX_INITIALIZER, 0, 0
};

struct mutex_cond {
    pthread_mutex_t mutex;
    pthread_cond_t cond;
    int nready;
} nready = {
    PTHREAD_MUTEX_INITIALIZER, PTHREAD_COND_INITIALIZER, 0
};

void* produce(void* arg)
{
    while(1) {
        pthread_mutex_lock(&put.mutex);
        if (put.nput >= nitems) {
            pthread_mutex_unlock(&put.mutex);
            return NULL;
        }
        buff[put.nput] = put.nval;
        put.nput++;
        put.nval++;
        pthread_mutex_unlock(&put.mutex);
        
        int dosignal;
        pthread_mutex_lock(&nready.mutex);
        dosignal = (nready.nready == 0);
        nready.nready++;
        pthread_mutex_unlock(&nready.mutex);
        
        if (dosignal)
            pthread_cond_signal(&nready.cond);
        
        *((int*)arg) += 1;  // count[i]++
    }
}

void* consume(void* arg)
{
    for(int i=0; i<nitems; ++i) {
        pthread_mutex_lock(&nready.mutex);
        while(nready.nready == 0)
            pthread_cond_wait(&nready.cond, &nready.mutex);
        nready.nready--;
        pthread_mutex_unlock(&nready.mutex);
        
        if(buff[i] != i)
            printf("buff[%d] = %d\n", i, buff[i]);
        else
            printf("the buff else\n");
    }
}

int main()
{
    int nthreads = MAXNTHREADS;
    int count[MAXNTHREADS];
    pthread_t tid_produce[MAXNTHREADS];
    pthread_t tid_consume;
    // producer
    for(int i=0; i<nthreads; ++i) {
        count[i] = 0;
        pthread_create(&tid_produce[i], NULL, produce, &count[i]);
    }
    // consumer
    pthread_create(&tid_consume, NULL, consume, NULL);
    
    for(int i=0; i<nthreads; ++i) {
        pthread_join(tid_produce[i], NULL);
        printf("count[%d] = %d\n", i, count[i]);
    }
    printf("produce success\n");
    pthread_join(tid_consume, NULL);
    printf("consume success\n");
    
    return 0;
}