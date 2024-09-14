import { queryLyricInfo } from '../../../apis/tecent/index.js'

const handleLyricInfo = async (ctx, next) => {
	const {song_id, song_mid} = ctx.request.query;
	const [flag, res] = await queryLyricInfo({song_id, song_mid})
	
	ctx.set('Content-Type', 'text/plain; charset=utf-8');
	if (!flag) {
		ctx.body = '暂无歌词内容';
		return
	}

	ctx.body = res.data.lyric;
}

export {handleLyricInfo}