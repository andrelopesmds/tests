var request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

var url = process.argv[2];
var output = process.argv[3];

solve(url, output);

function solve(url, targetPath){

  request(url, function (error, response, body) {

    if( !error && response.statusCode == 200){  
  
      var lines = body.split("\n");
      var responseSize = [];
      var statusCode = [];
      var cacheStatus = [];
      var httpMethod = [];
      var uriPath = [];
      var timeTaken = []; 
      for (i = 0; i < lines.length-1; i++){
      
        line = lines[i];
        index1 = line.indexOf("|");
        responseSize[i] = line.substring(0, index1);
        index2 = line.indexOf("|", index1 + 1);
        statusCode[i] = line.substring( index1 + 1, index2);      
        index3 = line.indexOf("|", index2 + 1);
        cacheStatus[i] = line.substring( index2 + 1, index3);
        if(cacheStatus[i] == "INVALIDATE"){
          cacheStatus[i] = "REFRESH_HIT";
        }
        index4 = line.indexOf('"', index3);
        index5 = line.indexOf("/", index4);
        httpMethod[i] = line.substring(index4 + 1, index5 - 1);
        index6 = line.indexOf(" ", index5);
        uriPath[i] = line.substring(index5, index6);
        index7 = line.indexOf("|", index6);
        index8 = line.indexOf("\r", index7)
        timeTaken[i] = Math.round(parseFloat(line.substring(index7 + 1, index8)));
        } 

        writeCsv(targetPath, responseSize, statusCode, cacheStatus, httpMethod, uriPath, timeTaken);
        console.log("We are working on it ...");
      }else{

        console.log("Error: Bad entry data");}

  });
}

function writeCsv(targetPath, responseSize, statusCode, cacheStatus, httpMethod, uriPath, timeTaken){

const csvWriter = createCsvWriter({
    path: targetPath,
    header: [
        {id: 'provider', title: 'PROVIDER'},
        {id: 'http', title: 'HTTP METHOD'},
        {id: 'status', title: 'STATUS CODE'},
        {id: 'uri', title: 'URI PATH'},
        {id: 'time', title: 'TIME TAKEN'},
        {id: 'response', title: 'RESPONSE SIZE'},
        {id: 'cache', title: 'CACHE STATUS'},
    ]
});
 
const records = [];
for(i = 0; i < responseSize.length; i++){
  records[i] = {
    provider: '"MINHA CDN"', 
    http: httpMethod[i],
    status: statusCode[i],
    uri: uriPath[i],
    time: timeTaken[i],
    response: responseSize[i],
    cache: cacheStatus[i]
    };  
}

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('... csv created successfully!');
    });
}

module.exports = solve;
