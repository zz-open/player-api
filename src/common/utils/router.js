import url from 'node:url'
import { getServerAddress } from './env.js'

export function getServerTecentSongUrl({ song_mid = '' }) {
  return new url.URL(`/v1.0.0/tecent/songUrl?song_mid=${song_mid}`, getServerAddress()).toString()
}

export function getServerTecentSongCoverUrl({ pmid = '', size = '300x300', max_age = 2592000 }) {
  return new url.URL(`/v1.0.0/tecent/coverInfo?pmid=${pmid}&size=${size}&max_age=${max_age}`, getServerAddress()).toString()
}

export function getServerTecentLyricUrl({ song_id = 0, song_mid = '' }) {
  return new url.URL(`/v1.0.0/tecent/lyricInfo?song_id=${song_id}&song_mid=${song_mid}`, getServerAddress()).toString()
}
