import qs from 'qs'

import { sendRequest } from '../../common/request/instance.js'
import { getTecentMusicApiConfig, TECENT_MUSIC_WEB_API_C } from '../../config/index.js'
import { isEmpty} from '../../common/utils/index.js'

const _baseUrl = `${TECENT_MUSIC_WEB_API_C}/rsc/fcgi-bin/fcg_user_created_diss`

/**
 * 查询用户歌单列表
 * @returns 
 */
export async function queryUserPlaylist() {
	const {HEARDERS, PARAMS_1} = getTecentMusicApiConfig()
	const _t = new Date().getTime()
	const searchParams = qs.stringify(
		{
			...PARAMS_1,
			r: _t,
			_t: _t,
			sin: 0,
			size: 100
		}, 
		{ encode: false }
	)

	const requestOptions = {
		url:`${_baseUrl}?${searchParams}`, 
		options: { headers: HEARDERS } 
	}

	const [flag, res] = await sendRequest(requestOptions)
	if (!flag) {
		return [false, res]
	}

	return [true, transform(res.data.data)]
}

function transform(data) {
	const baseData = {
		total: 0,
		disslist: []
	}

	if (isEmpty(data)) {
		return baseData
	}

	const {totoal: total, disslist} = data // todo: 绝对是实习生写的，哈哈！！！
	baseData.disslist = disslist.map(item => {
		return {
			diss_tid: item.tid,
			diss_name: item.diss_name,
			song_cnt: item.song_cnt,
			cover: item.diss_cover,
		}
	}).filter(item => item.diss_tid > 0)

	baseData.total = baseData.disslist.length
	return baseData
}