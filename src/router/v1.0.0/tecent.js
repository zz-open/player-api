import Router from 'koa-router'
import {handleUserPlaylist, handlePlaylistInfo, handleSongInfo} from '../../controller/v1.0.0/tecent/index.js'

const router = new Router({prefix: '/v1.0.0/tecent', sensitive: true})

router.get('/userPlaylist', handleUserPlaylist)
router.get('/playlistInfo', handlePlaylistInfo)
router.get('/songInfo', handleSongInfo)

export {router as v1_0_0_TecentRouter}
