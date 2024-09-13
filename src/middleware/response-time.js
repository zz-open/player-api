import { REQUEST_TIME } from '../config/index.js'
import {logger} from '../common/utils/index.js'

/**
 * Add X-Response-Time header field.
 * @param {Dictionary} options options dictionary. { hrtime }
 *
 *        hrtime: boolean.
 *          `true` to use time in nanoseconds.
 *          `false` to use time in milliseconds.
 *          Default is `false` to keep back compatible.
 */
export default (options) => {
  let hrtime = options && options.hrtime

  return async (ctx, next) => {
    let start = process.hrtime()
    await next()
    let delta = process.hrtime(start)

    // Format to high resolution time with nano time
    delta = delta[0] * 1000 + delta[1] / 1000000
    if (!hrtime) {
      // truncate to milliseconds.
      delta = Math.round(delta)
    }
    ctx.set('X-Response-Time', delta + 'ms')

    logger.info({
      type: REQUEST_TIME,
      base: {
        ip: ctx.request.ip,
        method: ctx.method,
        path: ctx.path,
        delta
      }
    })
  }
}