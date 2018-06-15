
const {cache} = require('../config/defaultConf');

module.exports = (stat,req,res)=>{
    const {expires,cacheControl,maxAge,lastModified,eTag} = cache;
    if(expires){
        res.setHeader('Expires',new Date(Date.now()+maxAge*1000).toUTCString());
    }
    if(cacheControl){
        res.setHeader('Cache-Control',`public,max-age=${maxAge}`);
    }
    if(eTag){
        res.setHeader('ETag',`${stat.mtime}-${stat.size}`);
    }
    if(lastModified){
        res.setHeader('Last-Modified',stat.mtime.toUTCString());
    }

    const reqEtag = req.headers['if-none-match'];
    const reqLastModified = req.headers['if-modified-since'];
    if(!reqEtag&&!reqLastModified){
        return false;
    }
    if(reqEtag&&reqEtag!=res.getHeader('ETag')){
        console.log('ETag:',reqEtag,res.getHeader('ETag'))
        return false;
    }
    if(reqLastModified&&reqLastModified!=res.getHeader('Last-Modified')){
        console.log('Modified:',reqLastModified,res.getHeader('Last-Modified'))        
        return false;
    }
    return true;
    
};