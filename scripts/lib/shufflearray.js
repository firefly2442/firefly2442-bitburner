export function shufflearray(array) {
    // https://rajatexplains.com/shuffle-an-array-in-place
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));    
        // swap elements array[i] and array[j]
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }