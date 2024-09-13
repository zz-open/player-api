import qs from 'qs'

import { sendRequest } from '../../common/request/instance.js'
import { getTecentMusicApiConfig, TECENT_MUSIC_WEB_API_U } from '../../config/index.js'
import { businessFailResponse } from '../../common/response/index.js'
import { tecentZzcSign, isEmpty } from '../../common/utils/index.js'

const _baseUrl = `${TECENT_MUSIC_WEB_API_U}/cgi-bin/musics.fcg`
const songCnt = 1000 // 歌单歌曲数量

/**
 * 查询歌单信息，包括歌曲列表
 * @returns 
 */
export async function queryPlaylistInfo(params = {}) {
	const {diss_tid = 0} = params
	console.log('diss_tid:', diss_tid)
	if (!diss_tid) {
		return [false, businessFailResponse("歌单id不能为空")]
	}
	
	const req_2 = {
		"module":"music.srfDissInfo.aiDissInfo",
		"method":"uniform_get_Dissinfo",
		"param":{
			"disstid": Number(diss_tid), // todo: 这里必须是数字,不然调不通
			"song_num": Number(songCnt),
			"userinfo":1,
			"tag":1,
			"orderlist":1,
			"song_begin":0,
			"onlysonglist":0,
			"enc_host_uin":""
		}
	}

	const {HEARDERS, PARAMS_2} = getTecentMusicApiConfig()
	const body = {
		comm: PARAMS_2,
		req_2, // 歌单歌曲信息在req_2的返回结果里
		//req_1:{"module":"music.musicsearch.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"searchid":"30682039538598481","remoteplace":"txt.yqq.top","from":"yqqweb"}},
		//req_3:{"module":"music.paycenterapi.LoginStateVerificationApi","method":"GetChargeAccount","param":{"appid":"mlive"}},
		//req_4:{"module":"MessageCenter.MessageCenterServer","method":"GetMessage","param":{"uin":"373045134","red_dot":[{"msg_type":1}]}},
		//req_5:{"module":"GlobalComment.GlobalCommentMessageReadServer","method":"GetMessage","param":{"uin":"373045134","page_num":0,"page_size":1,"last_msg_id":"","type":0}}
	}

	const _t = new Date().getTime()
	const requestOptions = {
		url: `${_baseUrl}?${qs.stringify({ _: _t, sign: tecentZzcSign(body)}, { encode: false })}`,
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

	return [true, transform(res.data)]
}

function transform(data) {
	console.log('data:', data)
	const baseData = {
		total: 0,
		songlist: []
	}
	
	const {req_2} = data
	const {code:req_2_code, data:req_2_data, msg:req_2_msg} = req_2
	if (req_2_code != 0) {
		return businessFailResponse(req_2_msg, req_2_code)
	}

	const req_2_response = handleReq2Data(req_2_data)
	baseData.songlist = req_2_response.songlist
	baseData.total = req_2_response.total

	return baseData
}

function handleReq2Data(req_2_data) {
	const {songlist} = req_2_data
	if (isEmpty(songlist)) {
		return baseData
	}

	const newSonglist = songlist.map((item) => {
		return {
			id: item.id,
			mid: item.mid,
			songtype: item.songtype,
			type: item.type,
			name: item.name,
			title: item.title,
			singer: {
				id: item.singer[0].id,
				mid: item.singer[0].mid,
				name: item.singer[0].name,
				title: item.singer[0].title,
			},
			album: {
				id: item.album.id,
				mid: item.album.mid,
				name: item.album.name,
				title: item.album.title,
				pmid: item.album.pmid,
			}
		}
	})

	return {
		songlist: newSonglist,
		total: newSonglist.length
	}
}