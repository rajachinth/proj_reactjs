
/*given a list of elements = [1, 2, 1] add 41 to it. Assume after adding the number the length of array would remain the same*/

const arr1 = [1,2,1];
const data1 = (+arr1.join('')) + 41;
const arr2 = Array.from(data1.toString()).map(e => +e);
console.log(arr2);
