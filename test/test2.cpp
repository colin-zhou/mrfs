#include <iostream>
#include <string.h>
using namespace std;

int aa(char *x)
{
	strcat(x, "acbc");
	return 1;
}

int main()
{
	char a[100] = "123";
	aa(a);
	cout<<a<<endl;
}