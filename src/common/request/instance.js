import {baseRequest} from './base.js'
import {successResponse, businessFailResponse, serverFailResponse} from '../response/index.js'
import {to} from '../share/index.js'

export async function sendRequest({ url, options = {}}) {
	const [err, response] = await to(baseRequest(url, options));
	if (err) {
		return [false, serverFailResponse(err.message)]
	}

	const {code, message} = response.data
	if (code != 0) {
		return [false, businessFailResponse(message, code)]
	}

	return [true, successResponse(response.data)]
}