import requestLog from './request-log.js'
import responseTime from './response-time.js'
import cors from '@koa/cors'

export default function(app) {
    app.use(cors())
    // request log
    .use(requestLog())
    // request time
    .use(responseTime({ hrtime: true }))
}