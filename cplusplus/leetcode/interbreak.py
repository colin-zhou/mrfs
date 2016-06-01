class Solution(object):
    def __init__(self):
        self.maxmap = {}
        self.maxmap[2] = (1,1)
        self.maxmap[3] = (2,1)
        self.maxmap[4] = (4,2)
        self.maxmap[5] = (6,2)
        
    def fn1(self, n, minp):
        minv = self.maxmap[n][1]
        maxm = self.maxmap[n][0]
        if minv == 2:
            newm = maxm / minv * 3
            if newm % minv != 0:
                newv = 3
            else:
                newv = min(3, minv)
        else:
            newm = maxm / minv * self.maxmap[minv+1][0]
            if newm % minv == 0:
                newv = min(self.maxmap[minv+1][1], minv)
            else:
                newv = self.maxmap[minv+1][1]
        self.maxmap[n+1] = (newm, newv)
        return self.maxmap[n+1]
        
    def integerBreak(self,n):
        for i in range(5,n+1):
            self.fn1(i, self.maxmap[i][1])
            #print i,self.maxmap[i]
        return self.maxmap[n][0]

if __name__ == "__main__":
    a = Solution()
    print a.integerBreak(10)
