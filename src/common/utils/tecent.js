import Buffer from 'node:buffer'
import url from 'node:url'
import qs from 'qs'
import { businessFailResponse, successResponse } from '../response/index.js'
import { isEmpty } from './fn.js'
import { getServerTecentLyricUrl, getServerTecentSongCoverUrl, getServerTecentSongUrl } from './router.js'
import { tecentZzcSign } from './tecent-sign.js'

export const TECENT_MUSIC_WEB_API_U = 'https://u6.y.qq.com'
export const TECENT_MUSIC_WEB_API_C = 'https://c6.y.qq.com'
export const TECENT_MUSIC_WEB_API_BASE_URL = `${TECENT_MUSIC_WEB_API_U}/cgi-bin/musics.fcg`

export const TECENT_MUSIC_WEB_API_COVER_URL = '//y.qq.com/music/photo_new'

export function getTecentMusicCover({ pmid = '', size = '300x300', max_age = 2592000 }) {
  // y.qq.com/music/photo_new/T002R300x300M00000119QDk1SkUf7_1.jpg?max_age=2592000
  // 将来可能会变
  return `${TECENT_MUSIC_WEB_API_COVER_URL}/T002R${size}M000${pmid}.jpg?max_age=${max_age}`
}

export function getTecentMusicWebApiRequestBaseUrl(data) {
  const searchParams = qs.stringify({
    _: new Date().getTime(),
    sign: tecentZzcSign(data),
  }, { encode: false })

  const url = `${TECENT_MUSIC_WEB_API_BASE_URL}?${searchParams}`
  return url
}

export function generateGuid() {
  return (Math.random() * 1000000000).toFixed(0)
}

export function getTecentMusicWebApiConfig() {
  const headers = {
    'Cookie': global.APP_CONF.tecent.cookie,
    'Referer': 'https://y.qq.com/',
    'Origin': 'https://y.qq.com',
    'User-Agent': global.APP_CONF.userAgent,
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

  return {
    API_URL_1: `${TECENT_MUSIC_WEB_API_C}/rsc/fcgi-bin/fcg_user_created_diss`,
    API_URL_2: getTecentMusicWebApiRequestBaseUrl,
    HEARDERS: headers,
    API_PARAMS_1: {
      ...baseApiParams,
      hostuin: global.APP_CONF.tecent.uin || '0',
    },
    API_PARAMS_2: {
      ...baseApiParams,
    },
    guid: generateGuid,
  }
}

/**
 * 解析平台歌曲播放地址接口
 */
export function resolveMusicVkeyGetVkeyGetUrl(data) {
  const { req_5 } = data
  const { code: req_5_code, data: req_5_data, msg: req_5_msg } = req_5
  if (Number(req_5_code) !== 0) {
    return [false, businessFailResponse(req_5_msg, req_5_code)]
  }

  const baseData = {
    total: 0,
    songs: [],
  }

  // 这个接口能获取到音频播放地址
  // sip 里是播放地址 host, 可能有多个
  // midurlinfo 里是音频播放地址
  const { sip, midurlinfo } = req_5_data
  if (isEmpty(sip) || isEmpty(midurlinfo)) {
    return [true, successResponse(baseData)]
  }

  const songHost = sip[0]
  const songs = midurlinfo.map((item) => {
    const { songmid, filename, purl, vkey } = item
    return {
      songmid,
      vkey,
      filename,
      purl: purl || '', // 此处需要考虑，有些歌曲没版权，不能播放，平台purl字段为空
      url: purl ? new url.URL(purl, songHost) : '',
    }
  })

  baseData.songs = songs
  baseData.total = songs.length
  return [true, successResponse(baseData)]
}

/**
 * 解析平台歌曲播放地址接口, 并且只返回一个url
 */
export function resolveMusicVkeyGetVkeyGetUrlWithSingleUrl(data) {
  const { req_5 } = data
  const { code: req_5_code, data: req_5_data, msg: req_5_msg } = req_5
  if (Number(req_5_code) !== 0) {
    return [false, businessFailResponse(req_5_msg, req_5_code)]
  }

  const baseData = {
    url: '',
  }

  const { sip, midurlinfo } = req_5_data
  if (isEmpty(sip) || isEmpty(midurlinfo)) {
    return [true, successResponse(baseData)]
  }

  const songHost = sip[0]
  const songs = midurlinfo.map((item) => {
    // 此处需要考虑，有些歌曲没版权，不能播放，平台purl,vkey字段为空
    const { purl, vkey } = item
    return {
      url: purl ? new url.URL(purl, songHost).toString() : '',
      vkey,
    }
  })

  baseData.url = !isEmpty(songs) && !isEmpty(songs[0]) ? songs[0].url : ''
  return [true, successResponse(baseData)]
}

/**
 * 解析平台歌词接口
 */
export function resolveMusicMusichallSongPlayLyricInfoGetPlayLyricInfor(data) {
  const { req_2 } = data
  const { code: req_2_code, data: req_2_data, msg: req_2_msg } = req_2
  if (Number(req_2_code) !== 0) {
    return [false, businessFailResponse(req_2_msg, req_2_code)]
  }

  const baseData = {
    lyric: '',
  }

  const { lyric } = req_2_data
  if (isEmpty(lyric)) {
    return [true, successResponse(baseData)]
  }

  // base64 解码
  baseData.lyric = Buffer.from(lyric, 'base64').toString('utf8')
  return [true, successResponse(baseData)]
}

/**
 * 解析平台歌单歌曲列表接口
 */
export function resolveMusicSrfDissInfoAiDissInfouniformGetDissinfo(data) {
  const { req_2 } = data
  const { code: req_2_code, data: req_2_data, msg: req_2_msg } = req_2
  if (Number(req_2_code) !== 0) {
    return [false, businessFailResponse(req_2_msg, req_2_code)]
  }

  const { dirinfo, songlist } = req_2_data

  const baseData = {
    // 设置歌单信息
    playlist: {
      id: dirinfo.id,
      name: dirinfo.title,
      cover: dirinfo.picurl,
      song_cnt: dirinfo.songnum,
      disable_song_cnt: 0,
    },
    songs: {
      total: 0,
      songs: [],
    },
  }

  if (isEmpty(songlist)) {
    return [true, successResponse(baseData)]
  }

  let disableSongCnt = 0
  const songList = songlist.map((item) => {
    // todo: 把不能播放的歌曲直接过滤掉，不知道为什么，网页不能播，客户端却能正常播放
    const { alert: _alert } = item.action
    const _disabled = !_alert
    if (_disabled) {
      disableSongCnt += 1
    }

    const singerNames = item.singer.map(singer => singer.name).join('/')
    return {
      song_id: item.id,
      song_mid: item.mid,
      title: item.title,
      singer: item.singer,
      album: item.album,
      name: item.name,
      artist: singerNames,
      cover: getServerTecentSongCoverUrl({ pmid: item.album.pmid }),
      lrc: getServerTecentLyricUrl({ song_mid: item.mid }),
      url: getServerTecentSongUrl({ song_mid: item.mid }),
      disable: _disabled,
    }
  })

  baseData.songs.songs = songList
  baseData.songs.total = songList.length
  baseData.playlist.disable_song_cnt = disableSongCnt
  return [true, successResponse(baseData)]
}
