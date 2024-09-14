import Router from 'koa-router'
import { handleCoverInfo, handleLyricInfo, handlePlaylistInfo, handleSongInfo, handleSongUrl, handleUserPlaylist } from '../../controller/v1.0.0/tecent/index.js'

const router = new Router({ prefix: '/v1.0.0/tecent', sensitive: true })

router.post('/songInfo', handleSongInfo)
router.get('/userPlaylist', handleUserPlaylist)

router.get('/playlistInfo', handlePlaylistInfo)
router.get('/lyricInfo', handleLyricInfo)
router.get('/songUrl', handleSongUrl)
router.get('/coverInfo', handleCoverInfo)

export { router as v1_0_0_TecentRouter }
