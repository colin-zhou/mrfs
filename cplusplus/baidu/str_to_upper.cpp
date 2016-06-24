#include <ctype.h>
#include <iostream>
using namespace std;

void str_to_upper(char *in_str, int size)
{
    if(in_str == NULL) {
        return;
    }
    for (int i = 0; i < size; i++) {
        if (islower(in_str[i])){
            in_str[i] = (char)toupper(in_str[i]);
        }
    }
}

int main()
{
    cout << "please input 20 character:" << endl;
    char tmp_str[21];
    int idx = 0;
    while(idx != 20) {
        cin >> tmp_str[idx];
        idx++;
    }
    tmp_str[20] = '\0';
    str_to_upper(tmp_str, 20);
    for (idx = 19; idx >=0; idx--) {
        cout << tmp_str[idx];
    }
    cout << endl;
    return 0;
}
