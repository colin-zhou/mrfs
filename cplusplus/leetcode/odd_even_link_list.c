#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>

//  Definition for singly-linked list.
struct ListNode {
     int val;
     struct ListNode *next;
};

void print_list(struct ListNode* head) {
	while(head != NULL) {
		printf("val = %d\n", head->val);
		head = head->next;
	}
}

struct ListNode* array_to_link(int a[], uint size)
{
	struct ListNode *arr = (struct ListNode*)malloc(sizeof(struct ListNode) * size);
	int i;
	for(i = 0 ;i < size; i++) {
		arr[i].val = a[i];
		arr[i].next = arr+i+1;
	}
	arr[i-1].next = NULL;
	return arr;
}

struct ListNode* oddEvenList(struct ListNode* head) {
    struct ListNode *odd = NULL,  *start_odd = NULL;
    struct ListNode *even = NULL, *start_even = NULL;
    struct ListNode *thead = head;
    int i = 1;
    while(head != NULL) {
    	thead = thead->next;
    	head->next = NULL;
 	if (i++ % 2 == 0) {
 		if (even == NULL) {
 			start_even = head;
 			even = head;
 		} else {
 			even->next = head;
 			even = even->next;
 		}
 	} else {
 		if (odd == NULL) {
 			start_odd = head;
 			odd = head;
 		} else {
 			odd->next = head;
 			odd = odd->next;
 		}
 	}
    	head = thead;
    }
    if (start_odd != NULL) {
    	odd->next = start_even;
    } else {
    	start_odd = start_even;
    }
    return start_odd;
}

int main()
{
	struct ListNode* head;
	int arr[] = {2,1,4,3,6,5,7,8};
	struct ListNode *t = array_to_link(arr, 8);
	print_list(t);
	struct ListNode *v = oddEvenList(t);
	print_list(v);
	return 0;
}