import { sendRequest } from '../../common/request/index.js'
import { businessFailResponse } from '../../common/response/index.js'
import { getTecentMusicWebApiConfig, resolveMusicMusichallSongPlayLyricInfoGetPlayLyricInfor } from '../../common/utils/index.js'

/**
 * 查询歌词信息
 */
export async function queryLyricInfo(params = {}) {
  console.log('params:', params)
  const { song_id = 0, song_mid = '' } = params
  if (!song_id) {
    return [false, businessFailResponse('歌曲id不能为空')]
  }

  if (!song_mid) {
    return [false, businessFailResponse('歌曲mid不能为空')]
  }

  const { API_URL_2, HEARDERS, API_PARAMS_2 } = getTecentMusicWebApiConfig()
  const body = {
    comm: API_PARAMS_2,
    req_2: {
      module: 'music.musichallSong.PlayLyricInfo',
      method: 'GetPlayLyricInfo',
      param: {
        songMID: song_mid,
        songID: Number(song_id), // 必须是数字类型，不能是字符串类型
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

  return resolveMusicMusichallSongPlayLyricInfoGetPlayLyricInfor(res.data)
}
