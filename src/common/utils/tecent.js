import qs from 'qs'
import url from 'url'

import { tecentZzcSign } from './tecent-sign2.js';
import {businessFailResponse, successResponse} from '../response/index.js'
import {isEmpty} from './fn.js'

export const TECENT_MUSIC_WEB_API_U = 'https://u6.y.qq.com';
export const TECENT_MUSIC_WEB_API_C = 'https://c6.y.qq.com';
export const TECENT_MUSIC_WEB_API_BASE_URL = `${TECENT_MUSIC_WEB_API_U}/cgi-bin/musics.fcg`;

export const TECENT_MUSIC_WEB_API_COVER_URL = '//y.qq.com/music/photo_new'


export function getTecentMusicSongCover({pmid = '', size='300x300', max_age=2592000}) {
	// y.qq.com/music/photo_new/T002R300x300M000004FKCj71O4Hhz_2.jpg?max_age=2592000
    return `${TECENT_MUSIC_WEB_API_COVER_URL}/T002R${size}${pmid}.jpg?max_age=${max_age}`
}

export function getTecentMusicWebApiRequestBaseUrl(data) {
    const searchParams = qs.stringify({
        '_': new Date().getTime(),
        'sign': tecentZzcSign(data)
    }, { encode: false })

    const url = `${TECENT_MUSIC_WEB_API_BASE_URL}?${searchParams}`
    return url
}

export function generateGuid(){
	return (Math.random() * 1000000000).toFixed(0)
}

export function getTecentMusicWebApiConfig() {
	const headers = {
		Cookie: global.APPLICATION_CONFIG.tecent.cookie,
		Referer: 'https://y.qq.com/',
		Origin: 'https://y.qq.com',
		'User-Agent': global.APPLICATION_CONFIG.userAgent,
	}

	const baseApiParams = {
		cv: 4747474, // 固定
		ct: 24, // 固定
		g_tk: 2090557760, // 固定
		inCharset: 'utf8', // 固定
		outCharset: 'utf-8', // 固定
		format: 'json', // 固定
		notice: 0, // 固定
		platform: 'yqq.json', // 固定
		needNewCode: 1, // 固定
		g_tk_new_20200303: 802375924, // todo: 不确定		
	}

	const params1 = {...baseApiParams, ...{hostuin: global.APPLICATION_CONFIG.tecent.uin || '0',}}
	const params2 = {...baseApiParams}
	
	return {
        API_URL_1: `${TECENT_MUSIC_WEB_API_C}/rsc/fcgi-bin/fcg_user_created_diss`,
        API_URL_2: getTecentMusicWebApiRequestBaseUrl,
		HEARDERS: headers,
		API_PARAMS_1: params1,
		API_PARAMS_2: params2,
		guid: generateGuid
	}
}

/**
 * 解析平台歌曲播放地址接口
 */
export function resolveMusicVkeyGetVkeyGetUrl(data) {
	const {req_5} = data
	const {code:req_5_code, data:req_5_data, msg:req_5_msg} = req_5
	if (req_5_code != 0) {
		return [false, businessFailResponse(req_5_msg, req_5_code)]
	}

	const baseData = {
		total: 0,
		songs: [],
	}
	
	// 这个接口能获取到音频播放地址
	// sip 里是播放地址 host, 可能有多个
	// midurlinfo 里是音频播放地址
	const {sip, midurlinfo} = req_5_data
	if (isEmpty(sip) || isEmpty(midurlinfo)) {
		return [true, successResponse(baseData)]
	}

	const songHost = sip[0]
	const songs = midurlinfo.map((item) => {
		const {songmid,filename,purl,vkey} = item
		return {
			songmid: songmid,
			vkey: vkey,
			filename: filename,
			purl: purl,
			url: purl ? new url.URL(purl, songHost) : ''
		}
	})

	baseData.songs = songs
	baseData.total = songs.length
	return [true, successResponse(baseData)]
}

/**
 * 解析平台歌曲播放地址接口, 并且只返回一个url
 */
export function resolveMusicVkeyGetVkeyGetUrlWithSingleUrl(data) {
	const {req_5} = data
	const {code:req_5_code, data:req_5_data, msg:req_5_msg} = req_5
	if (req_5_code != 0) {
		return [false, businessFailResponse(req_5_msg, req_5_code)]
	}

	const baseData = {
		url: '',
	}
	
	const {sip, midurlinfo} = req_5_data
	if (isEmpty(sip) || isEmpty(midurlinfo)) {
		return [true, successResponse(baseData)]
	}

	const songHost = sip[0]
	const songs = midurlinfo.map((item) => {
		const {purl} = item
		return {
			url: purl ? new url.URL(purl, songHost).toString() : ''
		}
	})

	
	baseData.url = !isEmpty(songs) && !isEmpty(songs[0]) ? songs[0].url : ''
	return [true, successResponse(baseData)]
}

/**
 * 解析平台歌词接口
 */
export function resolveMusicMusichallSongPlayLyricInfoGetPlayLyricInfor(data) {
	const {req_2} = data
	const {code:req_2_code, data:req_2_data, msg:req_2_msg} = req_2
	if (req_2_code != 0) {
		return [false, businessFailResponse(req_2_msg, req_2_code)]
	}

	const baseData = {
		lyric: '',
	}

	const {lyric} = req_2_data
	if (isEmpty(lyric)) {
		return [true, successResponse(baseData)]
	}

	// base64 解码
	baseData.lyric = Buffer.from(lyric, 'base64').toString('utf8');
	return [true, successResponse(baseData)]
}


/**
 * 解析平台歌单歌曲列表接口
 */
export function resolveMusicSrfDissInfoAiDissInfouniformGetDissinfo(data, prefixUrl = '') {
	const {req_2} = data
	const {code:req_2_code, data:req_2_data, msg:req_2_msg} = req_2
	if (req_2_code != 0) {
		return [false, businessFailResponse(req_2_msg, req_2_code)]
	}

	const baseData = {
		playlist: {}, 			// 歌单信息
		songs: { 					// 歌曲列表
			total: 0,
			songs: []
		}
	}

	const {dirinfo, songlist} = req_2_data
	// 设置歌单信息
	baseData.playlist.id = dirinfo.id
	baseData.playlist.name = dirinfo.title
	baseData.playlist.cover = dirinfo.picurl
	baseData.playlist.song_cnt = dirinfo.songnum

	if (isEmpty(songlist)) {
		return [true, successResponse(baseData)]
	}

	const songList = songlist.map((item) => {
		const singerNames = item.singer.map((singer) => singer.name).join('/')

		return {
			song_id: item.id,
			song_mid: item.mid,
			title: item.title,
			singer: item.singer,
			album: item.album,
			name: item.name,
			artist: singerNames,
			cover: getTecentMusicSongCover({pmid: item.album.pmid}),
			lrc: new url.URL(`/v1.0.0/tecent/lyricInfo?song_id=${item.id}&song_mid=${item.mid}`, prefixUrl).toString(),
			url: new url.URL(`/v1.0.0/tecent/songUrl?song_mid=${item.mid}`, prefixUrl).toString(),
		}
	})

	baseData.songs.songs = songList
	baseData.songs.total = songList.length
	return [true,successResponse(baseData)]
}