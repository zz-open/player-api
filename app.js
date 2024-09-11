import Koa from 'koa'
import chalk from 'chalk'
import {useAddRouter} from './router/index.js'
import {GLOBAL_CONFIG} from './config/index.js'

const app = new Koa()

function main() {
    console.log(chalk.green('\n🥳🎉 欢迎使用 仔仔音乐api服务. \n'));
    console.log(chalk.red('\n 支持QQ音乐, 网易云音乐. \n'));

    if (!(GLOBAL_CONFIG.tecent.loginUin || GLOBAL_CONFIG.tecent.cookie)) {
        console.log(chalk.yellow(`😔 The configuration ${chalk.red('tecent.loginUin')} or your ${chalk.red('tecent.cookie')} in file ${chalk.green('application.json')} has not configured. \n`));
    }

    useAddRouter(app)
    
    app.listen(GLOBAL_CONFIG.server.port, () => {
        console.log(chalk.green(`\n🎉🎉🎉 server running http://localhost:${GLOBAL_CONFIG.server.port} \n`));
    })
}

export default main