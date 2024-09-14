import process from 'process'
import dotenvx from "@dotenvx/dotenvx"
dotenvx.config()

import {defaultConfig} from './config/index.js'

export function initGlobalConfig() {
    global.APP_CONF = {
        userAgent: defaultConfig.userAgent,
        env: {
            env: process.env.PA_ENV,
            port: process.env.PA_SERVER_PORT,
            https: process.env.PA_HTTPS == 'true' ? true : false,
            public_host: process.env.PA_PUBLIC_HOST,
            internal_host: process.env.PA_INTERNAL_HOST,
        },
        tecent: {
            uin: process.env.PA_TECENT_UIN,
            cookie: process.env.PA_TECENT_COOKIE,
        },
        netease: {
        }
    }

    global.APP_UTILS = {
        tecent: {
            isLogined: () => {
                global.APP_CONF.tecent.cookie ? true : false
            }
        }
    }

    console.log('global.APP_CONF：', global.APP_CONF)
}

initGlobalConfig()