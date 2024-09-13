import { join } from 'path'
import { format as _format, transports as _transports, createLogger as __createLogger } from 'winston'
import 'winston-daily-rotate-file'
import {__dirname} from './path.js'
//
// Logging levels
//
const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow'
  }
}

const printfFormat = _format.printf((info) => {
  const { timestamp, level, message, name } = info
  const colorLevel = _format
    .colorize()
    .colorize(level, level.toUpperCase())
  const messageText = Object.is(typeof message, 'object')
    ? JSON.stringify(message)
    : message
  return `${timestamp} [${name}] ${colorLevel} ${messageText}`
})

const createDayTransport = (preName, level = 'info') => {
  return new _transports.DailyRotateFile({
    filename: `${preName}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    dirname: join(__dirname, '../logs'),
    maxSize: '10m',
    utc: false,
    maxFiles: '30d',
    format: _format.combine(
      _format.json(),
      _format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      })
    ),
    createSymlink: true,
    symlinkName: `${preName}.log`,
    level
  })
}

const createLogger = (name) => {
  let _logger = new __createLogger({
    level: 'info',
    levels: config.levels,
    format: _format.combine(
      _format.json(),
      _format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      })
    ),
    defaultMeta: { name },
    transports: [
      createDayTransport('info', 'info'),
      createDayTransport('warn', 'warn'),
      createDayTransport('err', 'error')
    ]
  })

  _logger.add(
    new _transports.Console({
      format: printfFormat
    })
  )

  _logger.info(`${name} 日志服务已启动。`)
  return _logger
}

const _createLogger = createLogger
export { _createLogger as createLogger }

const logger = createLogger('main')

export default logger
