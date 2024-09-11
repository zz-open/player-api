import Koa from 'koa'
import chalk from 'chalk'
import {useAddRouter} from './router/index.js'
import {GLOBAL_CONFIG} from './config/index.js'

const app = new Koa()

function main() {
    console.log(chalk.green('\n🥳🎉 We had supported config the user cookies. \n'));

    useAddRouter(app)
    
    app.listen(GLOBAL_CONFIG.server.port, () => {
        console.log(chalk.green(`\n🥳🎉 server running @ http://localhost:${GLOBAL_CONFIG.server.port} \n`));
    })
}

export default main