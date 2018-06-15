const {createDeflate,createGzip} = require('zlib');

module.exports = function(rs,req,res){
    const acceptEncoding = req.headers['accept-encoding'];
    if(!acceptEncoding||!acceptEncoding.match(/\b(gzip|deflate)\b/)){
        return rs;
    }else if(acceptEncoding.match(/\b(gzip)\b/)){
        res.setHeader('content-encoding','gzip');
        console.log('gzip');
        return rs.pipe(createGzip());
    }else if(acceptEncoding.match(/\b(deflate)\b/)){
        res.setHeader('content-encoding','defalte');
        console.log('defalte');
        return rs.pipe(createDeflate());
    }
}