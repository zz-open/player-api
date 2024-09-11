import Koa from 'koa'
import chalk from 'chalk'
import {useAddRouter} from './router/index.js'
import {config} from './config/index.js'

const app = new Koa()

function main() {
    console.log(chalk.green('\n🥳🎉 We had supported config the user cookies. \n'));

    useAddRouter(app)
    
    app.listen(config.server.port, () => {
        console.log(chalk.green(`\n🥳🎉 server running @ http://localhost:${config.server.port} \n`));
    })
}

export default main