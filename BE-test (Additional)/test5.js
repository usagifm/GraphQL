/**
 * Direction:
 * Find prefix of the word from array of string
 *
 * Expected Result:
 * fl
 */
const words = ['flower', 'flow', 'flight'];

function result(words) {
  var temp = ""

    for(j=0; j<words[0].length; j++){
      
      if(words[0][j] == words[1][j] && words[1][j] == words[2][j]){
        // console.log(words[0][j])
        temp = temp + words[0][j]
      }
    }

  return temp

}

console.log(result(words));
