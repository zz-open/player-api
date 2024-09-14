import { queryUserPlaylist } from '../../../apis/tecent/index.js'

async function handleUserPlaylist(ctx, next) {
  const [_, res] = await queryUserPlaylist()
  ctx.body = res
}

export { handleUserPlaylist }
