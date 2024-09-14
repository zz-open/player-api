import Koa from 'koa'
import chalk from 'chalk'
import './config/index.js'
import {initRouter} from './router/index.js'
import initMiddleware from './middleware/index.js'

const app = new Koa()

function main() {
    initHello()
    
    if (!(global.APPLICATION_CONFIG.tecent.uin || global.APPLICATION_CONFIG.tecent.cookie)) {
        console.log(chalk.yellow(`😔 The configuration ${chalk.red('tecent.uin')} or your ${chalk.red('tecent.cookie')} in file ${chalk.green('settings.js')} has not configured. \n`));
        return
    }

    initMiddleware(app)
    initRouter(app)
    startServer()
}

function initHello(){
    console.log(chalk.green('\n🥳🎉 欢迎使用 仔仔音乐api服务. \n'));
    console.log(chalk.red('\n 支持 企鹅音乐, 网易云音乐. \n'));
}

function startServer(){
    app.listen(global.APPLICATION_CONFIG.server.port, () => {
        console.log(chalk.green(`\n🎉🎉🎉 server running http://localhost:${global.APPLICATION_CONFIG.server.port} \n`));
    })
}

export default main