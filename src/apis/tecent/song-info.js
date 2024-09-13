import qs from 'qs'

import { sendRequest } from '../../common/request/instance.js'
import { getTecentMusicApiConfig, TECENT_MUSIC_WEB_API_U } from '../../config/index.js'
import { businessFailResponse } from '../../common/response/index.js'
import { tecentZzcSign } from '../../common/utils/index.js'

const _baseUrl = `${TECENT_MUSIC_WEB_API_U}/cgi-bin/musics.fcg`

/**
 * 查询歌曲信息
 * @returns 
 */
export async function querySongInfo(params = {}) {
	const {song_id = 0} = params
	console.log('song_id:', song_id)
	if (!song_id) {
		return [false, businessFailResponse("歌曲id不能为空")]
	}
	
	const {HEARDERS, PARAMS_2} = getTecentMusicApiConfig()
	const body = {
		comm: PARAMS_2,
	}

	const _t = new Date().getTime()
	const requestOptions = {
		url: `${_baseUrl}?${qs.stringify({ _: _t, sign: tecentZzcSign(body)}, { encode: false })}`,
		options: {
			headers:HEARDERS
		}
	}
	
	const [flag, res] = await sendRequest(requestOptions)
	if (!flag) {
		return [false, res]
	}

	return [true, transform(res.data)]
}

function transform(data) {
	const baseData = {
		
	}
	
	return baseData
}