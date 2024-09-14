import { v4 } from 'uuid'

export function isEmpty(obj) {
  // 0, false, null, undefined, NaN, '', [], {} 返回false
  if (!obj) {
    return true
  }

  if (Array.isArray(obj) && obj.length === 0) {
    return true
  }

  if (typeof obj === 'object' && Object.keys(obj).length === 0) {
    return true
  }

  if (obj instanceof Map && obj.size === 0) {
    return true
  }

  if (obj instanceof Set && obj.size === 0) {
    return true
  }

  return false
}

export function isJSON(str) {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str)

      if (typeof obj == 'object' && obj) {
        return true
      }
      return false
    }
    catch (e) {
      return false
    }
  }
}

/**
 * 计算文本Hash
 * @param {*} textToHash
 * @param {*} algorithm
 */
function textHash(textToHash, algorithm = 'md5') {
  const shasum = crypto.createHash(algorithm)
  shasum.update(textToHash)
  return shasum.digest('hex')
}

function uuid() {
  return v4().replace(/-/g, '')
}

// 获取时间戳 （秒）
function getTimestamp(d) {
  return (d || new Date()).getTime()
}

function getSecondTimestamp(d) {
  return Number.parseInt(
    (d || new Date()).getTime().toString() / 1000,
  )
}

// 获取多位数字字符串
function rndNumberStr(n) {
  let rnd = ''
  for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10)
  return rnd
}

// 字符串加密 MD5
function md5(str) {
  const md5 = crypto.createHash('md5')
  md5.update(str)
  return md5.digest('hex')
}

// 密码
function password(str) {
  return md5(str).substr(6, 16)
}

// 随机token
function rndToken() {
  return md5(rndNumberStr(20))
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
