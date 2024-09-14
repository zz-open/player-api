import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import requestLog from './request-log.js'
import responseTime from './response-time.js'

export default function (app) {
  // 跨域
  app.use(cors())
    // body parser
    .use(bodyParser())
    // request log
    .use(requestLog())
    // request time
    .use(responseTime({ hrtime: true }))
}
