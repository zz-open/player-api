import {SERVER_ERROR, BUSINESS_ERROR, BUSINESS_SUCCESS} from './code.js'

export function response({code, data = null, message = '', time = new Date().getTime(), appendData = false}) {
    const base =  {
        code,
        message,
        time
    }

    if (appendData) {
        base.data = data
    }

    return base
}

export function successResponse(data = null) {
    return response({code:BUSINESS_SUCCESS, data, message: 'Success', appendData: true})
}

export function serverFailResponse(message, code = SERVER_ERROR) {
    return response({code, message})
}

export function businessFailResponse(message, code = BUSINESS_ERROR) {
    return response({code, message})
}