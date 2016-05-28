#include <stdio.h>
#include <stdlib.h>


int cmp(const void *a, const void *b)
{
    return *(const int *)a - *(const int *)b;
}
int* intersect(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {
    qsort(nums1, nums1Size, sizeof(int), &cmp);
    qsort(nums2, nums2Size, sizeof(int), &cmp);
    int minsize = nums1Size > nums2Size ? nums2Size: nums1Size;
    int *ret = (int *)malloc(sizeof(int) * minsize);
    printf("size= %d", minsize);
    int idx =0, i, j;
    for (i =0 , j = 0; i < nums1Size, j < nums2Size;) {
        if (nums1[i] < nums2[j]) {
            i++;
        } else if(nums1[i] > nums2[j]) {
            j++;
        } else {
            printf("i = %d, j = %d\n", i,j);
            ret[idx++] = nums1[i];
            printf("ret[idx-1] = %d\n", ret[idx-1]);
            i++;j++;
        }
    }
    *returnSize = idx;
    return ret;
}

int main()
{
    int ret;
    int nums1[] = {3};
    int nums2[] = {7,2,1,9,6,3,7,4,8};
    intersect(nums1, 1, nums2,9, &ret);
    printf("%d\n", ret);
    return 0;
}
