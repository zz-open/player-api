import '../../global.js'
import { getTecentMusicWebApiConfig } from '../../common/utils/index.js'
import axios from 'axios'

async function playlist_info() {
  const { API_URL_2, HEARDERS, API_PARAMS_2 } = getTecentMusicWebApiConfig()
  let data = {
    comm: API_PARAMS_2,
    // "req_1":{"module":"music.musicsearch.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"searchid":"35434214694281873","remoteplace":"txt.yqq.top","from":"yqqweb"}},
    req_2: { "module": "music.srfDissInfo.aiDissInfo", "method": "uniform_get_Dissinfo", "param": { "disstid": 8028674314, "userinfo": 1, "tag": 1, "orderlist": 1, "song_begin": 0, "song_num": 1000, "onlysonglist": 0, "enc_host_uin": "" } },
    // "req_3":{"module":"music.paycenterapi.LoginStateVerificationApi","method":"GetChargeAccount","param":{"appid":"mlive"}},
    // "req_4":{"module":"MessageCenter.MessageCenterServer","method":"GetMessage","param":{"uin":"373045134","red_dot":[{"msg_type":1}]}},
    // "req_5":{"module":"GlobalComment.GlobalCommentMessageReadServer","method":"GetMessage","param":{"uin":"373045134","page_num":0,"page_size":1,"last_msg_id":"","type":0}}
  }


  return axios.request(API_URL_2(data), {
    method: 'POST',
    data: data,
    headers: HEARDERS,
  })
}

describe("tecent_music_api", () => {
  test('playlist_info', async () => {
    const res = await playlist_info()
    const { code, req_2 } = res.data

    // 0, '0' 都没问题
    expect(code).toEqual(0);

    const { code: req_2_code, data: req_2_data } = req_2
    expect(req_2_code).toEqual(0);

    const { code: req_2_data_code, songlist } = req_2_data
    expect(req_2_code).toEqual(0);
    expect(Array.isArray(songlist)).toBe(true);
  });
})