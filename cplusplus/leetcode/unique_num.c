#include <stdio.h>

int ans[10];
int init = 0;

int myfun(int n) {
    if (n == 2){
        return 81;
    }
    return myfun(n-1)*(11-n);
}

void myinit() {
    ans[1] = 10;
    ans[2] = 91;
    int i;
    for (i = 3; i < 10; i++) {
        ans[i] = ans[i-1];
        ans[i] += myfun(i);
    }
}
int countNumbersWithUniqueDigits(int n) {
    if (!init) {
        myinit();
        init = 1;
    }
    if (n <=9 ){
        return ans[n];
    } else {
        return ans[9];
    }
}

int main(void){
  int i;
  for (i=1;i <= 10;i++) {
    printf("%d\n",countNumbersWithUniqueDigits(i));
  }
  return 0;
}
