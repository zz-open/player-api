import Router from 'koa-router'
import {handleUserPlaylist, handlePlaylistInfo, handleSongInfo, handleLyricInfo, handleSongUrl} from '../../controller/v1.0.0/tecent/index.js'

const router = new Router({prefix: '/v1.0.0/tecent', sensitive: true})

router.get('/userPlaylist', handleUserPlaylist)
router.get('/playlistInfo', handlePlaylistInfo)
router.get('/lyricInfo', handleLyricInfo)
router.post('/songInfo', handleSongInfo)
router.get('/songUrl', handleSongUrl)

export {router as v1_0_0_TecentRouter}
