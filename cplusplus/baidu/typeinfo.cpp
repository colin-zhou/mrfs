#include <typeinfo>
#include <iostream>

using namespace std;

class abc {
public:
    abc(){};
    int a;
};

struct xyz{
    int m;
    int n;
} hehe;

int main()
{
    abc test;
    cout << "the class is " << typeid(test).name() << endl; 
    cout << "the struct is " << typeid(hehe).name() << endl;
    return 0;
}
