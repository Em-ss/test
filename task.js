//исходный массив
let constArray = [2, 299, 5, 1, 27];
console.log(constArray);
//превращаем в строку
let serializedString = serialize(constArray);
console.log(serializedString);

//превращаем из строки в новый массив
let desirealizedArr = desizialize(serializedString);

console.log(desirealizedArr);

//ИНТЕГРАЦИОННЫЕ ТЕСТЫ
//проверка на максимальных длиннах и рандоме
//генерируем массив
let bigArray = generateRandomArray();
//сортируем натруальным порядком
bigArray.sort(function (a, b) {
  return a - b;
});
//превращаем в строку и сразу в новый массив
let str = serialize(bigArray);
let newArray = desizialize(str);
//сортируем натруальным порядком
newArray.sort(function (a, b) {
  return a - b;
});
//размеры массивов
console.log(bigArray.length);
console.log(newArray.length);
let compareResult = true;
//сравниваем по элементно
for (let i = 0; i < bigArray.length; i++) {
  if (bigArray[i] !== newArray[i]) {
    compareResult = false;
    break;
  }
}
//если true то успех
console.log(compareResult);
//сжатие в процентах(отношение длины строки к исходному массиву)
console.log(100 - (str.length / bigArray.toString().length) * 100);

function generateRandomArray() {
  let resultArray = [];
  let count = 1000;
  while (count--) {
    resultArray.push(Math.floor(Math.random() * 299) + 1);
  }
  return resultArray;
}

function serialize(arr) {
  let resultString = "";
  for (let i = 0; i < arr.length; i++) {
    let el = arr[i];
    if (el < 255) {
      resultString += String.fromCharCode(el);
    } else if (el >= 255 && el < 300) {
      let secondNum = el - 254;
      resultString += String.fromCharCode(254);
      resultString += String.fromCharCode(secondNum);
    } else {
      console.log("wrong number");
      return;
    }
    if (i < arr.length - 1) resultString += String.fromCharCode(0);
  }
  return resultString;
}

function desizialize(str) {
  var splitedArray = str.split(String.fromCharCode(0));
  let resultArray = [];
  splitedArray.forEach((result) => {
    let length = result.length;
    if (length == 1) {
      resultArray.push(result.charCodeAt(0));
    } else if (length >= 1) {
      let aggregator = 0;
      while (length--) {
        aggregator += result[length].charCodeAt(0);
      }
      resultArray.push(aggregator);
    } else {
      console.log("wrong char " + result);
    }
  });
  return resultArray;
}
