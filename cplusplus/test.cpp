#include <iostream>
#include <set>
#include <map>
#include <string>

using namespace std;

int main()
{
    std::map<std::string, std::set<long> > test;
    test["abc"].insert(123);
    if (test["xyz"].find(1) == test["xyz"].end()) {
        cout<<"not find"<<endl;
    }
    return 0;
}
