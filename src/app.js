import Koa from 'koa'
import chalk from 'chalk'
import './global.js'
import {initRouter} from './router/index.js'
import initMiddleware from './middleware/index.js'

const app = new Koa()

function main() {
    initHello()

    if (!(global.APP_CONF.tecent.uin || global.APP_CONF.tecent.cookie)) {
        console.log(chalk.yellow(`😔 The configuration ${chalk.red('PA_TECENT_UIN')} or your ${chalk.red('PA_TECENT_COOKIE')} in file ${chalk.green('.env')} has not configured. \n`));
        return
    }

    initMiddleware(app)
    initRouter(app)
    startServer()
}


function initHello(){
    console.log(chalk.green('\n🥳🎉 欢迎使用 仔仔音乐api服务. \n'));
    console.log(chalk.red('\n 目前支持 企鹅音乐, 网易云音乐. \n'));
}

function startServer(){
    app.listen(global.APP_CONF.env.port, '0.0.0.0', () => {
        console.log(chalk.green('\n🎉🎉🎉 server running successfully. \n'))
        console.log(chalk.green(`- internal address : http://${global.APP_CONF.env.internal_host}:${global.APP_CONF.env.port}`));
        console.log(chalk.green(`-   public address : http://${global.APP_CONF.env.public_host}:${global.APP_CONF.env.port}`));

        logger.info({
            type: LogType.INIT,
            msg: `Server listening on port: ${server.address().port}, env: ${
              process.env.NODE_ENV
            }.
            You can visit http://localhost:${server.address().port}`
          })
    })
}

export default main