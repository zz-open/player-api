import { readApplicationConf } from '../common/utils/index.js'
import { merge } from '../common/share/index.js'

const defaultConfig = {
    server: {
        port: 3000,
    },
    tecent: {
        cookie: '',
        loginUin: '',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    },
    netease: {
        cookie: '',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
    }
}

async function mergeConfig() {
    const applicationConf = await readApplicationConf()
    const config = merge({}, defaultConfig, applicationConf)
    // console.log("合并后的全局配置:", config)
    return config
}

const GLOBAL_CONFIG =await mergeConfig()
export { GLOBAL_CONFIG }