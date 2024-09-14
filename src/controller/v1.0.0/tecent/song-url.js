import { querySongUrl } from '../../../apis/tecent/index.js'
import { businessFailResponse } from '../../../common/response/index.js'

async function handleSongUrl(ctx, next) {
  const { song_mid = '' } = ctx.request.query
  const [flag, res] = await querySongUrl({ song_mid })
  if (!flag) {
    ctx.body = res
    return
  }

  if (res.data.url) {
    ctx.redirect(res.data.url)
    return
  }

  ctx.body = businessFailResponse('歌曲因版权问题，无法播放')
}

export { handleSongUrl }
