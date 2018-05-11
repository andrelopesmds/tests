var http = require('http');
var Client = require('node-rest-client').Client; 
var download = require('image-downloader');
const resizeImg = require('resize-img');
const fs = require('fs');

var client = new Client();

// get json object 
client.get("http://54.152.221.29/images.json", function (data, response) {
 
    var size = Object.keys(data.images).length;

    for (var i = 0 ; i < size; i++){
        // Download to a directory and save with the original filename 
        const options = {
            url: data.images[i].url,
            dest: '/Users/andre/Documents/Projects/Resize/Images' 
        }
        
        download.image(options)
            .then(({ filename, image }) => {
                console.log('File saved to', filename)

                // Resize images and store in a temporary directory
                resizeImg(image, {width: 320, height: 240}).then(buf => {
                    var name = filename.split('.')[0]+"small.jpg";
                    fs.writeFileSync(name, buf);
                });
                resizeImg(image, {width: 384, height: 288}).then(buf => {
                    var name = filename.split('.')[0]+"medium.jpg";
                    fs.writeFileSync(name, buf);
                });
                resizeImg(image, {width: 640, height: 480}).then(buf => {
                    var name = filename.split('.')[0]+"large.jpg";
                    fs.writeFileSync(name, buf);
                });
            }).catch((err) => {
                throw err
            })

    }
});

