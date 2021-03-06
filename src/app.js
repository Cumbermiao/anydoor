const http = require('http');
const chalk = require('chalk');
const path = require('path');
const conf = require('./config/defaultConf');
const pathSolver = require('./helper/router.js');
const openUrl = require('./helper/open');
// const server = http.createServer((req, res) => {
//     const filePath = path.join(conf.root, req.url);
//     console.log(conf.root, filePath, req.headers['accept-encoding'])
//     pathSolver(req, res, filePath,conf);
// });
// server.listen(conf.port, () => {
//     const addr = `http://${conf.host}:${conf.port}`;
//     console.info(`starting at ${chalk.green(addr)}`);
// });

class Server{
    constructor(defaultConfig) {
        this.conf = Object.assign({}, conf, defaultConfig);
    }
    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url);
            pathSolver(req, res, filePath,this.conf);
        });
        server.listen(this.conf.port, () => {
            const addr = `http://${this.conf.host}:${this.conf.port}`;
            console.info(`starting at ${chalk.green(addr)}`);
            openUrl(addr);
        });
    }

}
module.exports=Server;