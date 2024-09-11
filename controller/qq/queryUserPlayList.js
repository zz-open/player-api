import { queryUserPlayList } from '../../common/apis/qq/index.js'

const handle = async (ctx, next) => {
	const [flag, res] = await queryUserPlayList()
	ctx.body = res;
}

export default handle