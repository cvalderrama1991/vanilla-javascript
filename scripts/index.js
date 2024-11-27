function rmDuplicates(arr) {
  if (!Array.isArray(arr)) return 'Not an array!';

  if (arr.length <= 1) return arr;

  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

const arr1 = [1, 111, 1, 1, 1, 1, 3, 45, 4];
const arr2 = [1];
const arr3 = 'word';
const arr4 = null;
const arr5 = undefined;
const arr6 = {};
let arr7;

console.log(rmDuplicates(arr1));
