/* 
	Say you have an array for which the ith element is the price of a given stock on day i.
	Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times) 
	with the following restrictions:

	You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
	After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
	Example:

	prices = [1, 2, 3, 0, 2]
	maxProfit = 3
	transactions = [buy, sell, cooldown, buy, sell]
	Credits:
	Special thanks to @peisi for adding this problem and creating all test cases.

	Subscribe to see which companies asked this question
	Hide Tags Dynamic Programming
	Show Similar Problems
*/
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

// 0-buy
// 1-sell
// 2-cooldown
int last_state[3][10000];

int
max(int d, int c)
{
	return d>c?d:c;
}

int maxProfit(int* prices, int pricesSize) {
	int i;
	last_state[0][0] = 0;
	last_state[1][0] = -prices[0];
	last_state[2][0] = INT_MIN;

	for(i = 1; i < pricesSize; i++) {
		last_state[0][i] = max(last_state[0][i-1],last_state[2][i-1]);
		last_state[1][i] = max(last_state[1][i-1], last_state[0][i-1]-prices[i]);
		last_state[2][i] = last_state[1][i-1]+prices[i];
		printf("%d %d %d\n", last_state[0][i], last_state[1][i], last_state[2][i]);
	}
	return max(last_state[0][i-1], last_state[2][i-1]);
}
int main()
{
	int a[] = {1,2,3,0,2};
	int s = 5;
	printf("%d\n", maxProfit(a, s));
	return 0;
}