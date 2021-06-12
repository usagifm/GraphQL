/**
 * Direction:
 * Remove duplicated data from array
 * 
 * Expected Result:
 * [1, 2, 3, 4, 5]
 */
const data = [1, 4, 2, 3, 5, 3, 2, 4];

function result(data) {

  var obj = {};
  var res = [];
  for (i = 0; i < data.length; i++) {
      obj[data[i]] = true;
  }
  for (key in obj) {

      res.push(key);

  }
  return res;
}

console.log(result(data));
