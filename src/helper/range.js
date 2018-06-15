
module.exports = function(total,req,res){
    const range = req.headers.range;
    if(!range){
        return {code:200}
    }
    let ranges = range.match(/bytes=(\d*)-(\d*)/)
    let start = parseInt(ranges[1])||0;
    let end = parseInt(ranges[2])||total;
    if(start<0||end>total){
        return {code:200}
    }else{
        res.setHeader('accept-range','bytes');
        res.setHeader('content-range',`bytes ${start}-${end}/${total}`);
        res.setHeader('content-length',end-start);
        return {code:206,start,end};//206表示获取部分内容 200返回所有内容
    }
}