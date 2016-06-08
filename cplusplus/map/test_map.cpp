#include <map>
#include <iostream>
#include <string>

using namespace std;

struct abc{
    int hehe;
    char cc;
public:
    abc(int x,char t):hehe(x),cc(t){}
    abc(){}
};

int main()
{
    string a = "abc",b="efg";
    map<string, struct abc> hehe;
    hehe[a] = abc(100, 'c');
    cout << hehe[a].hehe <<endl;
    hehe[b].hehe;
    cout << hehe.size() <<endl;
    return 0;
}
