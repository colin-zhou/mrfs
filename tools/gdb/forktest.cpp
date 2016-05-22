#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>

void func(int pid, int ret)
{
    printf("My PID is %d, fork() returned %d\n", pid, ret);

    if (ret)
        printf("we are in the parent process\n");
    else
        printf("we are in the child process");
}

int main()
{
    int r = fork();
    func(getpid(), r);
    return 0;
}
