const yargs = require('yargs');
const Server = require('./app');
const conf = require('./config/defaultConf');

const argv = yargs.usage('anydoor [options]')
    .option('p', {
        alias: 'port',
        describe: '端口号',
        default: 3000
    })
    .option('h', {
        alias: 'host',
        describe: 'hostname',
        default: '127.0.0.1'
    }).option('d', {
        alias: 'root',
        describe: '根目录',
        default: process.cwd()
    }).help().argv;

var myConf = Object.assign({},conf,argv)
console.log('myConf:',myConf.port);
const server = new Server(argv);
console.log(server)
server.start();
