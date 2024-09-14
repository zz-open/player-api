import { querySongInfo } from '../../../apis/tecent/index.js'

const handleSongInfo = async (ctx, next) => {
	const { song_mids = [] } = ctx.request.body;
	const [_, res] = await querySongInfo({song_mids})
	ctx.body = res;
}

export {handleSongInfo}