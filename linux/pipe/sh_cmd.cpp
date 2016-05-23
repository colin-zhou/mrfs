#include <string>
#include <iostream>
#include <cstdio>
#include <memory>

// Reference: http://stackoverflow.com//478898/
std::string sh_exec(const char* cmd) {
	std::shared_ptr<FILE> pipe(popen(cmd, "r"), pclose);
	if (!pipe) return "ERROR";
	char buffer[128];
	std::string result = "";
	while (!feof(pipe.get())) {
		if (fgets(buffer, 128, pipe.get()) != NULL)
			result += buffer;
	}
	return result;
}



int main()
{
	const char* cmd = "ls -l\nla\nseq 10\n";
	std::string x = sh_exec(cmd);
	std::cout << x <<std::endl;
	return 0;
}