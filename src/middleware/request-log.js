import {logger} from '../common/utils/index.js'

import { CONTROLLER_INFO } from '../config/index.js'

export default (opts) => {
  return async function (ctx, next) {
    logger.info({
      type: CONTROLLER_INFO,
      ip: ctx.request.ip,
      method: ctx.method,
      path: ctx.path,
      msg: 'Received a new request',
      route: {
        router: ctx.params,
        query: ctx.query,
        body: ctx.request.body,
        headers: ctx.headers
      }
    })

    await next()
  }
}
