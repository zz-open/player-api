import { sendRequest } from '../../common/request/index.js'
import { businessFailResponse } from '../../common/response/index.js'
import { getTecentMusicWebApiConfig, resolveMusicSrfDissInfoAiDissInfouniformGetDissinfo } from '../../common/utils/index.js'

const songCnt = 1000 // 歌单歌曲数量

/**
 * 查询歌单信息，包括歌曲列表
 * @returns 
 */
export async function queryPlaylistInfo(params = {}) {
	const {diss_tid = 0} = params
	console.log('params:', params)
	if (!diss_tid) {
		return [false, businessFailResponse("歌单id不能为空")]
	}
	
	const {API_URL_2, HEARDERS, API_PARAMS_2} = getTecentMusicWebApiConfig()	
	const body = {
		comm: API_PARAMS_2,
		req_2: {
			"module":"music.srfDissInfo.aiDissInfo",
			"method":"uniform_get_Dissinfo",
			"param":{
				"disstid": Number(diss_tid), // todo: 这里必须是数字,不然调不通
				"song_num": songCnt,
				"userinfo":1,
				"tag":1,
				"orderlist":1,
				"song_begin":0,
				"onlysonglist":0,
				"enc_host_uin":""
			}
		}
	}

	const requestOptions = {
		url: API_URL_2(body),
		options: {
			method: 'POST',
			data: body, 
			headers:HEARDERS
		}
	}
	
	const [flag, res] = await sendRequest(requestOptions)
	if (!flag) {
		return [false, res]
	}

	return resolveMusicSrfDissInfoAiDissInfouniformGetDissinfo(res.data)
}