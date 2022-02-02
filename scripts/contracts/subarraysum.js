/** @param {NS} ns **/
export async function main(ns) {

    //Given the following integer array, find the contiguous subarray
    // (containing at least one number) which has the largest sum and return
    // that sum. 'Sum' refers to the sum of all the numbers in the subarray.
    let a = [9,6,7,4,5,-8,4,10,-8,-2,-2,-2,-1,2,5,-7,3,7,2,-1,-5,8,-3,10,-3,1,-5]
    
    
    let maxsum = 0
    for (var i = 0; i < a.length; i++) {
        ns.tprint(i + " / " + a.length)
        let sum = 0
        sum = sum + a[i]
        if (sum > maxsum) {
            maxsum = sum
        }
        for (var j = 0; j < a.length; j++) {
            sum = sum + a[j]
            if (sum > maxsum) {
                maxsum = sum
            }
        }
    }
    ns.tprint(maxsum)
    
    }