/**
 * Definition for a binary tree node.
 */

#include <string.h>
#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
      int val;
      struct TreeNode *left;
      struct TreeNode *right;
};

int gidx = 0;

void write_val(int val, char *abc)
{
    char tmp[15];
    sprintf(tmp, "%d", val);
    printf("tmp= %s\n", tmp);
    strcat(&abc[gidx], tmp);
    gidx += strlen(tmp);
}

void dfs_write(struct TreeNode *t, char *abc) {
    if (t == NULL) {
        return;
    }
    write_val(t->val, abc);
    if (t->left != NULL || t->right != NULL) {
        if (t->left != NULL) {
            abc[gidx++] = '(';
            dfs_write(t->left, abc);
            abc[gidx++] = ')';
        }
        if (t->right != NULL) {
            if (t->left == NULL) {
                abc[gidx++] = '(';
                abc[gidx++] = ')';
            }
            abc[gidx++] = '(';
            dfs_write(t->right, abc);
            abc[gidx++] = ')';
        }
    }
}

char* tree2str(struct TreeNode* t) {
    gidx = 0;
    char *res = (char *)malloc(sizeof(char) * 1000);
    bzero(res, sizeof(char) * 1000);
    dfs_write(t, res);
    return res;
}

int main()
{
    struct TreeNode *tmp;
    struct TreeNode t[10];    
    tmp = &t[0];
    t[0].val = 1;
    t[0].left = &t[1];
    t[0].right = &t[2];
    t[1].val = 2;
    t[1].left = NULL;
    t[1].right = NULL;
    t[2].val = 3;
    t[2].left = NULL;
    t[2].right = NULL;
    char *x = tree2str(t);
    printf("gidx= %d\n", gidx);
    for(int i = 0; i < 10; i++) {
        printf("%c\n", x[i]);
    }
    printf("result: %s\n", x);
}
