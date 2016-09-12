#include <iostream>
#include <map>


int main()
{
    std::map<char, int> mymap;
    std::map<char, int>::iterator it;

    mymap['a'] = 10;
    mymap['b'] = 20;
    mymap['c'] = 30;
    mymap['d'] = 40;
    mymap['e'] = 50;
    mymap['f'] = 60;

    for (it = mymap.begin(); it != mymap.end(); ) {
        if (it->first > 'b') {
            mymap.erase(it++);
            continue;
        }
        it++;
    }
   
    for (it = mymap.begin(); it != mymap.end(); ++it)
    std::cout << it->first << " ==> " << it->second << '\n';

    return 0;
}
