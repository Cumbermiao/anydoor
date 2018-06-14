
const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const artTemplate = require('art-template');
const conf = require('../config/defaultConf');


const tplPath = path.join(__dirname,'../template/dir.html');


module.exports = async function (req, res, filePath) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            const dir = path.relative(conf.root,filePath)
            const title = path.basename(filePath)
            var html = artTemplate(tplPath,{files,dir,title});
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
