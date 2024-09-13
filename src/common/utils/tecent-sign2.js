import { zzcSign } from '@jixun/qmweb-sign'

export function tecentZzcSign(data) {
    if (!data) {
        return ''
    }

    if (typeof data === 'string') {
        return zzcSign(data)
    }

    return zzcSign(JSON.stringify(data))
}