import settingsConfig from '../../settings.js'
import { toMerged } from '../common/share/index.js'

export const defaultConfig = {
    server: {
        port: 3678,
    },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    tecent: {
        uin: '',
        cookie: '',
    },
    netease: {
        cookie: '',
    }
}

export function initGlobalConfig() {
    const config = toMerged(defaultConfig, settingsConfig)
    global.APPLICATION_CONFIG = config
    global.APPLICATION_FN = {
        tecent: {
            isLogined: () => {
                global.APPLICATION_CONFIG.tecent.cookie ? true : false
            }
        }
       
    }
}

initGlobalConfig()