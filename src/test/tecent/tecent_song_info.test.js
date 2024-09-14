import '../../global.js'
import { getTecentMusicWebApiConfig, isEmpty } from '../../common/utils/index.js'
import axios from 'axios'

async function song_info() {
  const { API_URL_2, HEARDERS, API_PARAMS_2, guid } = getTecentMusicWebApiConfig()
  let data = {
    comm: API_PARAMS_2,
    "req_5": {
      "module": "music.vkey.GetVkey",
      "method": "GetUrl",
      "param": {
        "guid": guid(),
        "songmid": ["0015HWfX0EFlfG"],
        "songtype": [0],
        "uin": global.APP_CONF.tecent.uin,
        "loginflag": global.APP_CONF.tecent.cookie ? 1 : 0,
        "platform": "20", // 固定值
      }
    }
  }

  return axios.request(API_URL_2(data), {
    method: 'POST',
    data: data,
    headers: HEARDERS,
  })
}

describe("tecent_music_api", () => {
  test('song_info', async () => {
    const res = await song_info()
    console.log('res.data:', res.data)
    const { code, req_5 } = res.data

    // 0, '0' 都没问题
    expect(code).toEqual(0);

    const { code: req_5_code, data: req_5_data } = req_5
    expect(req_5_code).toEqual(0);

    const { sip, midurlinfo } = req_5_data
    expect(isEmpty(sip)).toBe(false);
    expect(isEmpty(midurlinfo)).toBe(false);
    console.log('midurlinfo:', midurlinfo)

    // 歌曲可能没有版权，所以可能没有purl,vkey
  });
})