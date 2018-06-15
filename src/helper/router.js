const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const artTemplate = require('art-template');
const conf = require('../config/defaultConf');
const mime = require('./mime');
const compress = require('./compress');
const range = require('./range');
const toCache = require('./cache');//判断是否去缓存读取

const tplPath = path.join(__dirname, '../template/dir.html');


module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            let ext = mime(filePath);
            res.setHeader('content-type', ext);
            console.log(toCache(stats,req,res))
            if(toCache(stats,req,res)){
                res.statusCode=304;
                res.end();
                return;
            }
            const {code,start,end}=range(stats.size,req,res);
            var rs;
            //206表示获取部分内容 200返回所有内容
            if(code==200){
                res.statusCode = 200;
                rs = fs.createReadStream(filePath);
            }else{
                res.statusCode = 206;
                rs = fs.createReadStream(filePath,{start,end});
            }
            if(filePath.match(conf.compress)){
                rs = compress(rs, req, res);
            }
            console.log(res.statusCode)
            rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            const dir = path.relative(conf.root, filePath);
            const title = path.basename(filePath);
            var html = artTemplate(tplPath, {
                files,
                dir,
                title
            });
            res.writeHead(200, {
                'content-type': 'text/html'
            });
            res.end(html);

        }
    } catch (err) {
        console.log(err);
        res.writeHead(404);
        res.end(`${filePath} is not a directory or file`);
    }
}
