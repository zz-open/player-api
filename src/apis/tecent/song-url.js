import { sendRequest } from '../../common/request/instance.js'
import { businessFailResponse } from '../../common/response/index.js'
import { getTecentMusicWebApiConfig, isEmpty, resolveMusicVkeyGetVkeyGetUrlWithSingleUrl } from '../../common/utils/index.js'

/**
 * 查询单首歌曲的播放地址
 */
export async function querySongUrl(params = {}) {
  console.log('params:', params)
  const { song_mid = '' } = params
  if (isEmpty(song_mid)) {
    return [false, businessFailResponse('歌曲mid不能为空')]
  }

  const { API_URL_2, HEARDERS, API_PARAMS_2, guid } = getTecentMusicWebApiConfig()
  const body = {
    comm: API_PARAMS_2,
    req_5: {
      module: 'music.vkey.GetVkey',
      method: 'GetUrl',
      param: {
        guid: guid(),
        songmid: [String(song_mid)],
        songtype: [0], // 不清楚作用，不修改
        uin: global.APP_CONF.tecent.uin,
        loginflag: global.APP_UTILS.tecent.isLogined() ? 1 : 0,
        platform: '20', // 固定值
      },
    },
  }

  const requestOptions = {
    url: API_URL_2(body),
    options: {
      method: 'POST',
      data: body,
      headers: HEARDERS,
    },
  }

  const [flag, res] = await sendRequest(requestOptions)
  if (!flag) {
    return [false, res]
  }

  return resolveMusicVkeyGetVkeyGetUrlWithSingleUrl(res.data)
}
