#include <iostream>

using namespace std;

#define LEN 5//败者树容量，多路归并数目
#define MIN -1//所有数据的可能最小值

int ls[LEN+1];//败者树,ls[0]存放胜者，其余存放败者
int buf[LEN+1];//存放多路归并的头元素值,多出来的一位放MIN

void adjust(int s,int *buf){//s是需要调整的buf的下标
    int t=(s+LEN)/2;//得到s的在败者树上面的父节点
    while(t>0){//不断与父节点对比，直到败者树的根节点
        if(buf[s]>buf[ls[t]]){//如果当前节点s（胜者）大于父节点
            ls[t]^=s;//交换ls[t]和s
            s^=ls[t];//s记录胜者
            ls[t]^=s;//父节点记录败者
        }
        t/=2;//得到败者树的上一个父节点，继续与当前胜者s比较
    }
    ls[0]=s;//最终的胜者记录于ls[0]
}

void build(int *buf){
    buf[LEN]=MIN;//最后一位放MIN
    int i;
    for(int i=0;i<LEN+1;++i)
        ls[i]=LEN;//所有败者树初始化为MIN的下标
    for(i=0;i<LEN;++i)
        adjust(i,buf);//依次调整即可完成初始化
}

int main()
{
    //初始buf
    int tmp[5]={18,21,16,11,19};
    memcpy(buf,tmp,LEN*sizeof(int));
    build(buf);
    cout<<buf[ls[0]]<<endl;//输出11

    //取出11后，buf[3]=17
    int tmp1[5]={18,21,16,17,19};
    memcpy(buf,tmp1,LEN*sizeof(int));
    adjust(3,buf);
    cout<<buf[ls[0]]<<endl;//输出16

    return 0;
}
