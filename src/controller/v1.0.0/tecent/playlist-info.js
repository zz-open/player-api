import { queryPlaylistInfo } from '../../../apis/tecent/index.js'

async function handlePlaylistInfo(ctx, next) {
  const { id } = ctx.request.query
  const [_, res] = await queryPlaylistInfo({ diss_tid: id })
  ctx.body = res
}

export { handlePlaylistInfo }
