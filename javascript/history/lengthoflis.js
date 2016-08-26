/**
 * @param {number[]} nums
 * @return {number}
 */
f = [];
var biggerval = function(nums, minval) {
    var i;
    var t = []
    for(i = 0; i < nums.length; i++) {
        if (nums[i] > minval)
            t.push(nums[i]);
    }
    return t;
}
var lengthOfLIS = function(nums, another) {
    if (nums.length <= 1) {
        return nums.length;
    }
    var x1, x2;
    var firstele = nums[0];
    var nnums = nums.slice(1);
    var narr = biggerval(nnums, firstele);
    x2 = 1 + lengthOfLIS(narr, true);
    // not account the first element
    if (!another && f[nnums.length]) {
        x1 = f[nnums.length];
    } else { 
        x1 = lengthOfLIS(nnums);
        f[nnums.length] = x1;
    }
    // consider the first one element
    return Math.max(x1, x2);
};