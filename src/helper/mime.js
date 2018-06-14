const path = require('path');

const mime =  {
    html: 'text/html',
    txt:'text/plain',
    jpg:'image/jpeg',
    js:'application/javascript',
    json:'application/json',
    css:'text/css'
};
module.exports = (filePath)=>{
    let ext = path.extname(filePath).split('.').pop().toLowerCase();
    if(ext&&mime[ext]){
        return mime[ext];
    }else{
        return mime.txt;
    }
};
