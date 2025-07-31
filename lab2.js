let str = "hello world";
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
let array2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let obj1 = { a: 1, b: 2, c: 3, d: 4};
let obj2 = { b: 4, d: 5 , f: 6, g: 7};

// 01- Create a function called ‘capitalizeWords’ that takes a string and returns the string with the first letter of each word capitalized.
function capitalizeWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase()+ word.slice(1)).join(' ');
}
console.log("🚀 ~ capitalizeWords ~ capitalizeWords(str):", capitalizeWords(str))

// 02- Create a function called ‘mergeSortedArrays’ that takes two sorted arrays and returns a single sorted array by merging them. ([1, 3, 5], [2, 4, 6]) ==> [1, 2, 3, 4, 5, 6]
function mergeSortedArrays(array, array2) {
    let mergedArray = [];
    mergedArray = array.concat(array2);
    return mergedArray.sort((a, b) => a - b);
}
console.log("🚀 ~ mergeSortedArrays ~ mergeSortedArrays(array, array2):", mergeSortedArrays(array, array2))

// 03- Write a function called ‘sumOfSquares’ that takes an array of numbers and returns the sum of their squares. Hint : use reduce()
function sumOfSquares(array) {
    return array.reduce((sum, number) => sum + number * number, 0);
}
console.log("🚀 ~ sumOfSquares ~ sumOfSquares(array):", sumOfSquares(array))

// 04- Create a function called ‘filterArray’ that takes an array and a callback function. The filterArray function should return a new array that contains only the elements for which the callback function returns true. Hint : do not use built in methodss
function callbackFilterArray(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] % 2 === 0) {
            result.push(array[i]);
        }
    }
    return result;
}

function filterArray(array, callbackFilterArray) {
    return callbackFilterArray(array);
}
console.log("🚀 ~ filterArray ~ filterArray(array, callbackFilterArray):", filterArray(array, callbackFilterArray))

// 05- Create a function called ‘mapArray’ that takes an array and a callback function. The mapArray function should return a new array where each element is the result of the callback function applied to the corresponding element of the input array. Hint : do not use built in methods
function callbackMapArray(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(array[i] * 2);
    }
    return result;
    
}

function mapArray(array, callbackMapArray) {
    let result = [];
    return callbackMapArray(array);
}
console.log("🚀 ~ mapArray ~ mapArray(array, callbackMapArray):", mapArray(array, callbackMapArray))

// 06- Create a function called ‘reduceArray’ that takes an array, a callback function, and an initial value. The reduceArray function should return a single value that is the result of applying the callback function to each element of the array, using the initial value as the starting point. Hint : do not use built in methods
function callbackReduceArray(array, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < array.length; i++) {
        accumulator = accumulator + array[i];
    }
    return accumulator;
}

function reduceArray(array, callbackReduceArray, initialValue) {
    return callbackReduceArray(array, initialValue);
}
console.log("🚀 ~ reduceArray ~ reduceArray(array, callbackReduceArray, initialValue):", reduceArray(array, callbackReduceArray, 0))

// 07- Create a function called forEachArray that takes an array and a callback function. The forEachArray function should apply the callback function to each element of the array. Hint : do not use built in methods
function callbackForEachArray(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i] * 2);
    }
}

function forEachArray(array, callbackForEachArray) {
    return callbackForEachArray(array);
}
console.log("🚀 ~ forEachArray ~ forEachArray(array, callbackForEachArray):", forEachArray(array, callbackForEachArray))

// 08- Write a function called findMax that takes an array of numbers and returns the maximum number in the array. Hint : use Math.max()
function findMax(array) {
    return Math.max(...array);
}
console.log("🚀 ~ findMax ~ findMax(array):", findMax(array))

// 09- Write a function called mergeObjects that takes two objects and returns a new object that combines the properties of both. If a property exists in both objects, the value from the second object should be used.
function mergeObjects(obj1, obj2) {
    let merged = {};
    for (let key in obj1) {
        merged[key] = obj1[key];
    }
    for (let key in obj2) {
        merged[key] = obj2[key];
    }
    return merged;
}
console.log("🚀 ~ mergeObjects ~ mergeObjects(obj1, obj2):", mergeObjects(obj1, obj2))

// 10- Write a function called invertObject that takes an object and returns a new object where the keys and values are swapped. { a: 1, b: 2, c: 3 } ==> { 1: 'a', 2: 'b', 3: 'c' }
function invertObject(obj1) {
    let inverted = {};
    for (let key in obj1) {
        inverted[obj1[key]] = key;
    }
    return inverted;
}
console.log("🚀 ~ invertObject ~ invertObject(obj1):", invertObject(obj1))

// 11- Write a function called omitKeys that takes an object and an array of keys, and returns a new object that omits the specified keys. { a: 1, b: 2, c: 3, d: 4 } ==> omit (b , d) ====> { a: 1, c: 3 }
function omitKeys(obj1, keys) {
    let newObj = {};
    for (let key in obj1) {
        if (!keys.includes(key)) {
            newObj[key] = obj1[key];
        }
    }
    return newObj;
}
console.log("🚀 ~ omitKeys ~ omitKeys(obj1, keys):", omitKeys(obj1, ["b", "d"]));

// 12- Write a function called pickKeys that takes an object and an array of keys, and returns a new object that includes only the specified keys. { a: 1, b: 2, c: 3, d: 4 } ==> omit (b , d) ====> { b: 2, d: 4 }
function pickKeys(obj1, keys) {
    let newObj = {};
    for (let key in obj1) {
        if (keys.includes(key)) {
            newObj[key] = obj1[key];
        }
    }
    return newObj;
}
console.log("🚀 ~ pickKeys ~ pickKeys(obj1, keys):", pickKeys(obj1, ["b", "d"]));

// 13- Write a function called reverseArray that takes an array and returns a new array with the elements in reverse order using map function.
function reverseArray(array) {
    let reversed = [];
    for (let i = array.length - 1; i >= 0; i--) {
        reversed.push(array[i]);
    }
    return reversed;
}
console.log("🚀 ~ reverseArray ~ reverseArray(array):", reverseArray(array))

// 14- Write a function called countOccurrences that takes an array and a value, and returns the number of times the value appears in the array.
function countOccurrences(array, value) {
    return array.reduce((count, current) => current === value ? count + 1 : count, 0);
}
console.log("🚀 ~ countOccurrences ~ countOccurrences(array, value):", countOccurrences(array, 1))