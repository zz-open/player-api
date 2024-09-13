export const TECENT_MUSIC_WEB_API_U = 'https://u6.y.qq.com';
export const TECENT_MUSIC_WEB_API_C = 'https://c6.y.qq.com';

export function getTecentMusicApiConfig() {
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
		HEARDERS: headers,
		PARAMS_1: params1,
		PARAMS_2: params2
	}
}