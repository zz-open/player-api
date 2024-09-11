
import Router from 'koa-router'

import {handleUserPlaylist} from '../controller/tecent/index.js'

const router = new Router({prefix: '/tecent', sensitive: true})
router.get('/userPlaylist', handleUserPlaylist)

export {router as tecentRouter}
