#!/bin/python
#-*-coding:utf-8-*-


class Solution(object):
    
    def list_to_dict(self, tlist):
        ret = {}
        for item in tlist:
            if item in ret:
                ret[item] += 1
            else:
                ret[item] = 1
        return ret

    def str_to_list(self, line, n): 
        return [line[i:i+n] for i in range(0, len(line), n)]

    def get_prob(self, start_idx, end_idx):
        if end_idx - start_idx < self.tlen:
            return False
        tmp_str = self.ts_[start_idx:start_idx+self.tlen]
        tmp_list = self.split_by_n(tmp_str, self.word_len)
        if self.cmp_set == self.list_to_dict(tmp_list):
            self.ret_list.append(start_idx)
        return True

    def findSubstring(self, s, words):
        """
        :type s: str
        :type words: List[str]
        :rtype: List[int]
        """
        self.ret_list = []
        self.cmp_set = self.list_to_dict(words)
        self.word_len = len(words[0])
        self.tlen = len(words) * len(words[0])
        self.ts_ = s
        max_len = len(s)
        for idx in range(max_len):
            if not self.get_prob(idx, max_len):
                break
        return self.ret_list

if __name__=="__main__":
    h = Solution()
    s = "barfoofoobarthefoobarman"
    words = ["bar","foo","the"]
    s = "lingmindraboofooowingdingbarrwingmonkeypoundcake"
    words = ["fooo","barr","wing","ding","wing"]
    print h.findSubstring(s, words)
