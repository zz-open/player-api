import {readApplicationConf} from '../utils/index.js'
const config = {
    port: 3000,
}

async function mergeConfig() {
    readApplicationConf()
}

const conf = await mergeConfig()

export {config}