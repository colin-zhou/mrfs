#include <iostream>
#include <limits.h>

using namespace std;

int main()
{
	double min_val, max_val, cur_val;	
	double total;
	int cnt;
	while (cin >> cnt) {
		total = 0;
		min_val = 100;
		max_val = 0;
		for(int i = 0;i < cnt; i++) {
			cin >> cur_val;
			total += cur_val;
			if (cur_val < min_val) {
				min_val = cur_val;
			}
			if (cur_val > max_val) {
				max_val = cur_val;
			}
		}
		cout << (total - min_val - max_val)/ (cnt - 2) << " ";
	}
	cout << endl;
	return 0;
}
