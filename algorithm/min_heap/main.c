#include <stdio.h>


void swap(int &a, int &b)
{
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
}

// 小根堆
void build_min_heap(int *A, int i, int N) {
    int l = 2 *i, r = 2 * i + 1;
    //只有2*i元素 ----数组总是左边的先存储的，不存在只有r 没有 l
    if (l < N && r > N-1 && A[i] > A[l]){
        swap(A[i], A[l]);
        build_min_heap(A,l, N);
    }
    //2*i 和 2*i+1都存在
    if(l < N && r < N){
        //2*i 最小
        if(A[l] < A[i] && A[l] < A[r]){
            swap(A[i],A[l]);
            build_min_heap(A,l, N);
        }
        //2*i+1最小
        if(A[r] < A[i] && A[r] < A[l]){
            swap(A[i],A[r]);
            build_min_heap(A,r, N);
        }
    }
}

int main()
{
    int A[] = {3, 4, 10, 20, 1, -1};
    int n = sizeof(A) / sizeof(A[0]);
    for(int i = (n-1)/2; i >= 0; --i){
        build_min_heap(A, i, n);
    }
    for(int i = 0; i < n; ++i) {
        printf("%d\n", A[i]);
    }
    return 0;
}
