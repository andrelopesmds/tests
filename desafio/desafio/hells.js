function myFunction(vector) {
    // get basic parameters of the problem
    var lines = vector.length;
    var nSol = Math.pow(2, lines-1);
    var steps = lines-1;
    var biggest = 0;

    // testing entry data
    if (lines == 0){
        biggest = "Empty vector";
    }else if(lines == 1){
        biggest = vector[0];
    }else {
        // verify all possible solutions
        for (var i = 0; i < nSol; i++) { 
            var binary = getBinary(i, lines-1);
            var numbers = getNumbers(vector, binary);
            console.log(numbers);
            var sum = numbers.reduce((a, b) => a + b, 0);
            if (sum > biggest){
                biggest = sum;
            }
        }
    }
    document.getElementById("demo").innerHTML = biggest;
}

function getNumbers(vector, binary){
    // get numbers from vector acroding with binary vector
    // 0 means "go left" and 1 means "go right"
    // Of course, I'll always go down
    var numbers = [vector[0][0]];
    var col = 0;
    for (var step = 1; step <= binary.length; step++){
        if(binary[step-1]==1){
            col++;
        }
        numbers.push(vector[step][col]);
    }
    return numbers;
}

function getBinary(i, n){
    //get binary from i
    var binary = i.toString(2);
    while(binary.length < n) {
        binary = "0" + binary;
    }
    return binary;   
}

function select(){
    var vector = [[6], [3,5], [9,7,1],[4,6,8,4]];
    myFunction(vector);
}

// just for tests
function select0(){
    var vector = [];
    myFunction(vector);
}
function select1(){
    var vector = [10];
    myFunction(vector);
}
function select2(){
    var vector = [[1],[13,9]];
    myFunction(vector);
}
function select5(){
    var vector = [[6], [3,5], [9,7,1],[4,6,8,4],[1,1,1,1,1]];
    myFunction(vector);
}
