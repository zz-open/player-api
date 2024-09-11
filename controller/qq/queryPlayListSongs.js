import { queryPlayListSongs } from '../../common/apis/qq/queryPlayListSongs.js'

const handle = async (ctx, next) => {
	const [flag, res] = await queryPlayListSongs()
	ctx.body = res;
}

export default handle