import { sendRequest } from './request/instance.js'
import {buildUrl} from '../../utils/index.js'
import {commonQueryParams,commonRequestHeaders} from './request/config.js'

/**
 * 查询用户歌单列表
 * @returns 
 */
export async function queryUserPlayList(){
	const _baseUrl = `https://c6.y.qq.com/rsc/fcgi-bin/fcg_user_created_diss`
	const _t = new Date().getTime()
	const url = buildUrl(_baseUrl, {...commonQueryParams,
		r: _t,
		_t: _t,
		cv: 4747474,
		ct: 24,
		sin: 0,
		size: 11
	})

	const [flag, res] = await sendRequest({url, options: {headers: commonRequestHeaders}})
	if (!flag) {
		return [false, res]
	}

	return [true, transform(res.data)]
}

function transform(data){
	const baseData = {
		total: 0,
		disslist: []
	}

	if (!data) {
		return baseData
	}

	baseData.total = data.totoal // todo: 绝对是实习生写的，哈哈！！！
	baseData.disslist = data.disslist.map(item => {
		return {
			diss_id: item.tid,
			diss_name: item.diss_name,
			song_cnt: item.song_cnt,
			cover: item.diss_cover,
		}
	}).filter(item => item.diss_id > 0)

	baseData.total = baseData.disslist.length
	return baseData
}