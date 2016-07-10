#include <stdio.h>
int 
main()
{
	int	n, idx;
	double res = 0;
	scanf("int put n: %d", &n);
    printf("%d", n);
	for (idx = 1; idx <= n; idx++) {
		res += 1.0 / (double)idx;
	}
	printf("the result is %lf\n", res);
	return 0;
}
