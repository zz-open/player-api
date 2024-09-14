import qs from 'qs'

import { sendRequest } from '../../common/request/index.js'
import { successResponse } from '../../common/response/index.js'
import { getTecentMusicWebApiConfig, isEmpty } from '../../common/utils/index.js'

/**
 * 查询用户歌单列表
 */
export async function queryUserPlaylist() {
  const { API_URL_1, HEARDERS, API_PARAMS_1 } = getTecentMusicWebApiConfig()
  const _t = new Date().getTime()
  const searchParams = qs.stringify(
    {
      ...API_PARAMS_1,
      r: _t,
      _t,
      sin: 0,
      size: 100,
    },
    { encode: false },
  )

  const requestOptions = {
    url: `${API_URL_1}?${searchParams}`,
    options: {
      headers: HEARDERS,
    },
  }
  const [flag, res] = await sendRequest(requestOptions)
  if (!flag) {
    return [false, res]
  }

  return [true, successResponse(transform(res.data.data))]
}

function transform(data) {
  const baseData = {
    total: 0,
    disslist: [],
  }

  if (isEmpty(data)) {
    return baseData
  }

  const { totoal: total, disslist } = data // todo: 绝对是实习生写的，哈哈！！！
  baseData.disslist = disslist.map((item) => {
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
