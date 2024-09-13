import { queryPlaylistInfo } from '../../../apis/tecent/index.js'

const handlePlaylistInfo = async (ctx, next) => {
	const {id: playlistId} = ctx.request.query;
	const [_, res] = await queryPlaylistInfo({diss_tid: playlistId})
	ctx.body = res;
}

export {handlePlaylistInfo}