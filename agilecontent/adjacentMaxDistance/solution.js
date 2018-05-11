function solution(A){

  var result = solve(A);
  return result;

}


function solve(A){

  if(validate(A)){

  var N = A.length;
  var pairs = [];
  var distance = [];
  var index = 0;
  var maxDistance = -2;
  for (i = 0; i < N; i++){

    for (j = 0; j < N; j++){

      if (i < j){

        if(haveAdjacentValues(A,i,j)){

          pairs[index] = [i, j];
          distance[index] = Math.abs(A[i]-A[j]);
          index++;
        }

      }      

    }

  } 
  
  return Math.max(...distance);
  }else{
    return -2;
  }
}

function haveAdjacentValues(A, i, j){

  for(k=0; k < A.length; k++){

    if( (A[i] < A[k] && A[k] < A[j]) || (A[i] > A[k] && A[k] > A[j]) ){

      return false;

    }

  }

  return true;
}


function validate(A){

  // A is an array consisting of N integers
  // N is an integer within range [1 ... 40,000]
  var N = A.length;

    if(Number.isInteger(N)){

      if(N > 1 && N <= 40000){

        if(testEachElement(A)){

          return true;

        }

      }

    }  

 return false;

}

function testEachElement(A){

  // each element of A is an integer within range [-2,147,483,648 ... 2,147,483,647]  
  for(i=0; i < A.length; i++){

    if(Number.isInteger(A[i])){

      if( A[i] < -2147483648 || A[i] > 2147483647) {

        return false;

      }

    }else{

      return false;

    }

  }

  return true;

}

module.exports = solution;

