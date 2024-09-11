
import Router from 'koa-router'

// qq 音乐相关接口
import handleQueryPlayListSongs from '../controller/qq/queryPlayListSongs.js'

const router = new Router({prefix: '/qq', sensitive: true})
router.get('/queryPlayListSongs', handleQueryPlayListSongs)

export {router as qqRouter}
