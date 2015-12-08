#include <string>
#include <iostream>


int main()
{
	std::string a = "afdladjflk";
	std::string *t = new std::string(a);
	std::cout<<*t<<std::endl;
	return 0;
}