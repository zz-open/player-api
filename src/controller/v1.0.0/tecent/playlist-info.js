import { queryPlaylistInfo } from '../../../apis/tecent/index.js'
import {getServerUrl} from '../../../common/utils/index.js'

const handlePlaylistInfo = async (ctx, next) => {
	const {id} = ctx.request.query;
	const [_, res] = await queryPlaylistInfo({prefixUrl: getServerUrl(ctx), diss_tid: id})
	ctx.body = res;
}

export {handlePlaylistInfo}