#include "../logger.h"
#include <unistd.h>
#include <stdio.h>

int main()
{
        printf("%cwhat\n", 0x20);
    	set_log_level(5);
	    log_info("what");
    	sleep(1);
	    return 0;
}
