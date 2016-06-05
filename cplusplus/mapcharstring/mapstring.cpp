#include <iostream>
#include <map>
#include <string>
#include <string.h>
using namespace std;

struct cmp_str{
    bool operator()(const char *a, const char *b) {
        return strcmp(a, b) < 0;
    }
};

int main()
{
    char x[] = "hahaha";
    char b[] = "hahahah";
    char c[] = "hahaha";

    std::map<char *, int, cmp_str> t;
    t[x] = 1;
    t[b] = 2;
    cout << t[x] <<endl;
    cout << t[c] <<endl;

    string ta = "aaaa";
    string tb = "bbbb";
    string tc = "aaaa";
    std::map<string, int> h;
    h[ta] = 1;
    h[tb] = 2;
    cout << h[tc] <<endl;
    return 0;
}

