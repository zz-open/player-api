import { tecentZzcSign } from '../../common/utils/index.js';
import axios from 'axios'
import qs from 'qs'

async function playlist_info() {
  let data = {
    "comm":{"cv":4747474,"ct":24,"format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"yqq.json","needNewCode":1,"uin":373045134,"g_tk_new_20200303":802375924,"g_tk":2090557760},
    // "req_1":{"module":"music.musicsearch.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"searchid":"35434214694281873","remoteplace":"txt.yqq.top","from":"yqqweb"}},
    "req_2":{"module":"music.srfDissInfo.aiDissInfo","method":"uniform_get_Dissinfo","param":{"disstid":8028674314,"userinfo":1,"tag":1,"orderlist":1,"song_begin":0,"song_num":1000,"onlysonglist":0,"enc_host_uin":""}},
    // "req_3":{"module":"music.paycenterapi.LoginStateVerificationApi","method":"GetChargeAccount","param":{"appid":"mlive"}},
    // "req_4":{"module":"MessageCenter.MessageCenterServer","method":"GetMessage","param":{"uin":"373045134","red_dot":[{"msg_type":1}]}},
    // "req_5":{"module":"GlobalComment.GlobalCommentMessageReadServer","method":"GetMessage","param":{"uin":"373045134","page_num":0,"page_size":1,"last_msg_id":"","type":0}}
    }

  const searchParams = qs.stringify({
    '_': new Date().getTime(),
    'sign': tecentZzcSign(data)
  }, {encode: false})

  const url = `https://u6.y.qq.com/cgi-bin/musics.fcg?${searchParams}`
  
  return axios.post(url, data, {
    headers: {
      'Cookie': 'eas_sid=L1B6e9K9j3w4Z838Y5V9n2u4w5; pgv_pvid=8283822219; RK=iFkJCGvMFr; ptcz=a5799d04bd5aff86ab262ff78d2e5d7a5cd8b2995e41c8010b6e5dbc96b44bd7; ts_uid=4091933368; fqm_pvqid=c9dce67b-5aed-41fb-939e-d4687ef1ac29; _clck=dog145|1|fl5|0; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22373045134%22%2C%22first_id%22%3A%2218f70ce35911415-0756bced636146-26001d51-2073600-18f70ce3592183f%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThmNzBjZTM1OTExNDE1LTA3NTZiY2VkNjM2MTQ2LTI2MDAxZDUxLTIwNzM2MDAtMThmNzBjZTM1OTIxODNmIiwiJGlkZW50aXR5X2xvZ2luX2lkIjoiMzczMDQ1MTM0In0%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22373045134%22%7D%2C%22%24device_id%22%3A%2218f70ce35911415-0756bced636146-26001d51-2073600-18f70ce3592183f%22%7D; _ga=GA1.2.866259306.1715584514; Qs_lvt_323937=1704439892%2C1723474539%2C1723474551; Qs_pv_323937=1086824545133110700%2C1157362543201645000%2C4227069768809372700; pgv_info=ssid=s9475647336; verifysession=h01c5c9640665b9c2fa86a7bbd18e06879289687a15377a830cb27ee27256db344cebc546f7c8cef124; skey=null; luin=null; lskey=null; user_id=null; session_id=null; _qpsvr_localtk=0.5412660401978255; fqm_sessionid=69c538b5-a7d2-4f2b-a34e-a7b2a1afd66e; _qimei_uuid42=1890a0e360310052aa9ee039410874a19d6122b730; pac_uid=0_R35YnK5shJFxp; current-city-name=bj; _qimei_fingerprint=14efe887a0c3384f2708a4fc164265b8; _qimei_q36=; _qimei_h38=fded901faa9ee039410874a10200000a21890a; login_type=1; psrf_qqopenid=75972009C68259F854E16449BF464BD5; wxrefresh_token=; psrf_qqaccess_token=558748F8B4C0DEBE150F82A8AFA287CD; euin=oiSioevkoKoP; psrf_qqunionid=6ABE5BDAF0A8628CFE2E26976BE23139; tmeLoginType=2; wxopenid=; wxunionid=; music_ignore_pskey=202306271436Hn@vBj; psrf_qqrefresh_token=69838324444E7FB745B32ED110CAC93F; open_id=75972009C68259F854E16449BF464BD5; ts_refer=music.qq.com/; psrf_access_token_expiresAt=1733982762; uin=373045134; qm_keyst=Q_H_L_63k3NbXLJ-c_nEtnGF34UVJIXgrR_fAhb6wSlT345Ou0-srGzwplXLI-KTBJ2SB0fbHZU9jdogh3SfAcmOT7hsw; qqmusic_key=Q_H_L_63k3NbXLJ-c_nEtnGF34UVJIXgrR_fAhb6wSlT345Ou0-srGzwplXLI-KTBJ2SB0fbHZU9jdogh3SfAcmOT7hsw; psrf_musickey_createtime=1726206762; ts_last=y.qq.com/',
      'Referer': 'https://y.qq.com/',
      'Origin': 'https://y.qq.com',
    },
  })
}

describe("tecent_music_api", () => {
  test('playlist_info', async () => {
    const res = await playlist_info()
    console.log("res.data:", res.data, typeof res.data)
    const {code, req_2} = res.data

    // 0, '0' 都没问题
    expect(code).toEqual(0);

    const {code: req_2_code, data: req_2_data} = req_2
    expect(req_2_code).toEqual(0);

    const {code: req_2_data_code, songlist} = req_2_data
    expect(req_2_code).toEqual(0);
    expect(Array.isArray(songlist)).toBe(true);
  });
})