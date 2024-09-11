import {GLOBAL_CONFIG} from '../../../config/index.js';

export const TECENT_MUSIC_WEB_API = 'https://c6.y.qq.com';

export const COMMON_PARAMS = {
	g_tk: 2090557760,
	g_tk_new_20200303: 964287689,
	uin: GLOBAL_CONFIG.tecent.loginUin || '0',
	hostuin: GLOBAL_CONFIG.tecent.loginUin || '0',
	inCharset: 'utf8',
	outCharset: 'utf-8',
	format: 'json',
	notice: 0,
	platform: 'yqq.json',
	needNewCode: 1
};

export const COMMON_HEADERS = {
	Cookie: GLOBAL_CONFIG.tecent.cookie,
	referer: 'https://y.qq.com/',
	origin: 'https://y.qq.com',
	'User-Agent': GLOBAL_CONFIG.tecent.userAgent,
}