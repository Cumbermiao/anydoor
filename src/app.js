const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConf');
const pathSolver = require('./helper/router.js');
const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root, req.url);
    console.log(conf.root,req['accept-encoding'])
    pathSolver(req,res,filePath);
});
server.listen(conf.port, () => {
    const addr = `http://${conf.host}:${conf.port}`;
    console.info(`starting at ${chalk.green(addr)}`);
});
