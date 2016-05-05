#include <iostream>
#include <list>

using namespace std;


int main()
{
    std::list<int> x{1,2,3,4,5,6};
    cout << "the size is" << x.size() <<endl;
    for(auto &b:x) {
        cout<<"value "<<b<<endl;
    }
    x.erase(x.begin(), --x.end());
    cout <<"the size is "<< x.size()<< endl;
    for(auto &b:x) {
        cout<<"value " <<b<<endl;
    }
    return 0;
}
