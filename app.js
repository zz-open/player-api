import Koa from 'koa';
import chalk from 'chalk';
const app = new Koa()
import {useAddRouter} from './router/index.js'
import {config} from './config/index.js'

function main() {
    console.log(chalk.green('\n🥳🎉 We had supported config the user cookies. \n'));

    useAddRouter(app)
    
    app.listen(config.port, () => {
        console.log(chalk.green(`\n🥳🎉 server running @ http://localhost:${config.port} \n`));
    })
}

export default main