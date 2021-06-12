/**
 * Direction:
 * Find missing number from the list
 *
 * Expected Result:
 * 8
 */
const numbers = [9, 6, 4, 2, 3, 5, 7, 0, 1];

function result(numbers) {
 
  var temp;
  for (var i = 0; i < numbers.length; i++) {

    for (var j = i + 1; j < numbers.length; j++) {
      if (numbers[j] < numbers[i]) {
        temp = numbers[j];
        numbers[j] = numbers[i];
        numbers[i] = temp;
      }
    
    }

    }

  var result = 0;
  if (numbers[0] > 1 || numbers[numbers.length - 1] < 1) {

    result = 1;
  } else {
      for (var i = 0; i < numbers.length; i++) {

      if ((numbers[i + 1] - numbers[i]) > 1) {
          result = numbers[i] + 1;
      }
    }
  }
  if (!result) {
    result = numbers[numbers.length - 1] + 1;
  }
  return result;
}


console.log(result(numbers));
