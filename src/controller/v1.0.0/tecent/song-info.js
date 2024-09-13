import { querySongInfo } from '../../../apis/tecent/index.js'

const handleSongInfo = async (ctx, next) => {
	const {id: songId} = ctx.request.query;
	const [_, res] = await querySongInfo({song_id: songId})
	ctx.body = res;
}

export {handleSongInfo}