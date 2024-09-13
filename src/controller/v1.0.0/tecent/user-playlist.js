import { queryUserPlaylist } from '../../../apis/tecent/index.js'

const handleUserPlaylist = async (ctx, next) => {
	const [_, res] = await queryUserPlaylist()
	ctx.body = res;
}

export {handleUserPlaylist}