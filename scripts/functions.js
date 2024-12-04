// Remove Duplicates from an Array
export function removeDuplicateFromArray(arr) {
  const uniqueArray = [];

  if (!Array.isArray(arr)) return 'Not a list';

  for (let i = 0; i < arr.length; i++) {
    let isDuplicate = false;

    for (let j = 0; j < uniqueArray.length; j++) {
      if (arr[i] === uniqueArray[j]) {
        isDuplicate = true
        break;
      }
    }

    if (isDuplicate === false) {
      uniqueArray.push(arr[i]);
    }
  }

  return uniqueArray;
}
