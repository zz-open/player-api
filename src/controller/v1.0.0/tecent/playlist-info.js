import { queryPlaylistInfo } from '../../../apis/tecent/index.js'

const handlePlaylistInfo = async (ctx, next) => {
	const {id} = ctx.request.query;
	const [_, res] = await queryPlaylistInfo({diss_tid: id})
	ctx.body = res;
}

export {handlePlaylistInfo}