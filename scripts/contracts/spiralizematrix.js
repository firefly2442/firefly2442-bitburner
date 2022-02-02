/** @param {NS} ns **/
export async function main(ns) {
    // Given the following array of arrays of numbers representing a 2D matrix, return the elements of the matrix as an array in spiral order:
    
    //     [
    //         [21,38,45,38,11,24, 3,29,10,28]
    //         [16, 5,36,49,38, 9,49,19,32,27]
    //         [23, 8,15, 6, 4,21,20,50,38,18]
    //         [40,36,48, 5,33,17,11,35,40,40]
    //         [30,13,18,17,41,40,25,40,31,48]
    //         [48, 8, 1,39,44, 5,21,24,44,39]
    //         [39,17,19,32,19,31,15,47,31,27]
    //         [36,16,14,50,50,37,46,23, 5,17]
    //         [42,35,16,43,45,45,48,15,14,26]
    //         [43,27,37,10,38,43,14,47,31,50]
    //         [ 9,17,39,50,20,29, 1,17,35,41]
    //     ]
    
    // Here is an example of what spiral order should be:
    
    //     [
    //         [1, 2, 3]
    //         [4, 5, 6]
    //         [7, 8, 9]
    //     ]
    
    // Answer: [1, 2, 3, 6, 9, 8 ,7, 4, 5]
    
    // Note that the matrix will not always be square:
    
    //     [
    //         [1,  2,  3,  4]
    //         [5,  6,  7,  8]
    //         [9, 10, 11, 12]
    //     ]
    
    // Answer: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
    
    
    let a = [
            [21,38,45,38,11,24, 3,29,10,28],
            [16, 5,36,49,38, 9,49,19,32,27],
            [23, 8,15, 6, 4,21,20,50,38,18],
            [40,36,48, 5,33,17,11,35,40,40],
            [30,13,18,17,41,40,25,40,31,48],
            [48, 8, 1,39,44, 5,21,24,44,39],
            [39,17,19,32,19,31,15,47,31,27],
            [36,16,14,50,50,37,46,23, 5,17],
            [42,35,16,43,45,45,48,15,14,26],
            [43,27,37,10,38,43,14,47,31,50],
            [ 9,17,39,50,20,29, 1,17,35,41]
        ]
    
    
    
    
    function transpose(b) {
        let rotated = [...Array(b.length)].map(e => Array(b[0].length))
        ns.tprint(rotated)
        for (let r = 0; r < b.length; r++) {
            ns.tprint(r)
            for (let c = 0; c < b[0].length; c++) {
                ns.tprint(c)
                ns.tprint(b[0].length - c)
                ns.tprint(b[r][c])
                ns.tprint(rotated[b[0].length - c][r])
                rotated[b[0].length - c][r] = b[r][c]
            }
        }
        return(rotated)
    }
    
    ns.tprint(a)
    let t = transpose(a)
    ns.tprint(t)
    ns.exit()
    
    let final = []
    let summed = 100
    while (summed != 0) {
        for (let j = 0; j < a[0].length; j++) { //cols
            if (a[0][j] != 0) {
                final.push(a[0][j])
            }
        }
        
        ns.tprint(a)
        a = transpose(a)
        ns.tprint(a)
    
        summed = 0
        for (let i = 0; i < a.length; i++) { //rows
            for (let j = 0; j < a[0].length; j++) { //cols
                summed = summed + a[i][j]
            }
         }
    
        await ns.sleep(1)
    }
    
    ns.tprint(final)
    
    }