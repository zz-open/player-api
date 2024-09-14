import '../../config/index.js'
import { getTecentMusicWebApiConfig } from '../../common/utils/index.js'
import axios from 'axios'

async function lyric_info() {
  const { API_URL_2, HEARDERS, API_PARAMS_2 } = getTecentMusicWebApiConfig()
  let data = {
    comm: API_PARAMS_2,
    req_2: {
			"module": "music.musichallSong.PlayLyricInfo",
			"method": "GetPlayLyricInfo",
			"param": {
				"songMID": '001nmqIV2nx5Hu',
				"songID": 170650 // 必须是数字类型，不能是字符串类型
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
  test('lyric_info', async () => {
    const res = await lyric_info()
    const { code, req_2 } = res.data

    // 0, '0' 都没问题
    expect(code).toEqual(0);

    const { code: req_2_code, data: req_2_data } = req_2
    expect(req_2_code).toEqual(0);

    const { lyric } = req_2_data
    expect(lyric).not.toBe('');
  });
})