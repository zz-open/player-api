import {config} from '../../../../config/index.js';

export const commonQueryParams = {
	g_tk: 2090557760,
	g_tk_new_20200303: 964287689,
	uin: config.qq.loginUin || '0',
	hostuin: config.qq.loginUin || '0',
	inCharset: 'utf8',
	outCharset: 'utf-8',
	format: 'json',
	notice: 0,
	platform: 'yqq.json',
	needNewCode: 1, // 可能是0
};

export const commonRequestHeaders = {
	Cookie: config.qq.cookie,
	origin: 'https://y.qq.com',
	'User-Agent': config.qq.userAgent
}

const _guid = (Math.round(2147483647 * Math.random()) * new Date().getUTCMilliseconds()) % 1e10;

const options = {
	param: 'jsonpCallback',
	prefix: 'tan',
	// prefix: 'jp',
};

const optionsPrefix = {
	param: 'jsonpCallback',
	prefix: 'playlistinfoCallback',
};