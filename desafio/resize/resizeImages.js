const fs = require('fs');
const resizeImg = require('resize-img');
 
resizeImg(fs.readFileSync('b737_1.jpg'), {width: 128, height: 128}).then(buf => {
    fs.writeFileSync('b737_1-128x128.jpg', buf);
});
