import {baseRequest} from './base.js'
import {successResponse, businessFailResponse, serverFailResponse} from '../../../response/index.js'
import {to} from '../../../share/index.js'

export async function sendRequest({ url, method = 'get', options = {} }) {
	const [err, response] = await to(baseRequest(url, method, options));
	if (err) {
		return [false, serverFailResponse(err.message)]
	}

	const {data, code, message} = response.data
	if (code != 0) {
		return [false, businessFailResponse(message, code)]
	}

	return [true, successResponse(data)]
}