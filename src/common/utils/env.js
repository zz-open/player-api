export function isDev() {
  return global.APP_CONF.env.env === 'development'
}

export function isProducution() {
  return global.APP_CONF.env.env === 'production'
}

export function getProtocol() {
  if (global.APP_CONF.env.https) {
    return 'https'
  }

  return 'http'
}

export function getPublicServerAddress() {
  return `${getProtocol()}://${global.APP_CONF.env.public_host}:${global.APP_CONF.env.port}`
}

export function getInternalServerAddress() {
  return `${getProtocol()}://${global.APP_CONF.env.internal_host}:${global.APP_CONF.env.port}`
}

export function getServerAddress() {
  return getPublicServerAddress()
}
