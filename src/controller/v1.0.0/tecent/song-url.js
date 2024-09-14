import { querySongUrl } from '../../../apis/tecent/index.js'

const handleSongUrl = async (ctx, next) => {
	const { song_mid = '' } = ctx.request.query;
	const [flag, res] = await querySongUrl({song_mid})
	if (!flag) {
		return res
	}

	ctx.redirect(res.data.url)
}

export {handleSongUrl}