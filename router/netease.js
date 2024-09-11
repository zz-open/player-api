
import Router from 'koa-router'

// 网易云 音乐相关接口
import handleQueryPlayListSongs from '../controller/netease/queryPlayListSongs.js'

const router = new Router({prefix: '/netease', sensitive: true})
router.get('/queryPlayListSongs', handleQueryPlayListSongs)

export {router as neteaseRouter}
