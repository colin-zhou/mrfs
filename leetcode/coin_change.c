#include <stdio.h>
#include <string.h>
#define min(a,b) (a)>(b)?(b):(a)
int dp[1000];
int coinChange(int* coins, int coinsSize, int amount) {
    int i,j;
    for(i = 0; i <= amount; i++){
        dp[i] = -1;
    }
    dp[0] = 0;
    for(i = 0; i <= amount; i++) {
        for(j = 0; j < coinsSize; j++) {
            int x = i-coins[j];
            if (x >= 0) {
                dp[i] = dp[i] > (dp[x] + 1) ? (dp[x] + 1): dp[i];
            }
        }
    }
    return dp[amount];
}

int main()
{
    int a[] = {2,5};
    int v = 3;
    printf("%d\n", coinChange(a, sizeof(a)/sizeof(int), v));
    return 0;
}
