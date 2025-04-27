import { removeDuplicates } from '../utils/index.js';

const main = document.querySelector('main');

const numbers = [1, 2, 3, 4, 5, 5, 3, 2, 1];

console.log(removeDuplicates(numbers));
console.log(numbers);

function add(nms) {
let total = 0;
for (let i = 0; i < nms.length; i++) {
	total = total + nms[i];
	}
	return total;
}

console.log([1,2,3]);
