#define _GNU_SOURCE
#include <link.h>
#include <stdlib.h>
#include <stdio.h>

static int g=0;

static int
callback(struct dl_phdr_info *info, size_t size, void *data)
{
    int j;
    void *t = (void *)&g;
    void *s_addr;
    void *e_addr;
    char *so_name = data;

    printf("name=%s (%d segments)\n", info->dlpi_name,
            info->dlpi_phnum);

    for (j = 0; j < info->dlpi_phnum; j++) {
        //printf("\t\t header %2d: s_address=%10p, e_address=%10p\n", j,
        //        (void *) (info->dlpi_addr + info->dlpi_phdr[j].p_vaddr),
		//(void *) (info->dlpi_addr + info->dlpi_phdr[j].p_vaddr + info->dlpi_phdr[j].p_memsz));
	s_addr = (void *) (info->dlpi_addr + info->dlpi_phdr[j].p_vaddr);
	e_addr = (void *) (info->dlpi_addr + info->dlpi_phdr[j].p_vaddr + info->dlpi_phdr[j].p_memsz);
	if (t < e_addr && t > s_addr) {
                sprintf(so_name, "%s", info->dlpi_name);
		//printf("right position\n");
	}
    }
    return 0;
}

int
do_test(void)
{
    //printf("---:%10p\n",&g);
    char so_name[256] = {0};
    dl_iterate_phdr(callback, so_name);
    printf("the so path is %s", so_name);
    //if (so_name[0] != 0) {
    //	printf("current so name is %s\n", so_name);
    //}
    //exit(EXIT_SUCCESS);
    return 0;
}
