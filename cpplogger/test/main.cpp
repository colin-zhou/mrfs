#include "../logger.h"
#include <unistd.h>

int main()
{
    set_log_level(4);
	log_info("what");
	sleep(1);

	return 0;
}
