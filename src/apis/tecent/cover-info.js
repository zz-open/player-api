import { businessFailResponse, successResponse } from '../../common/response/index.js'
import { getTecentMusicCover } from '../../common/utils/index.js'

/**
 * 查询封面信息
 * @returns 
 */
export async function queryCoverInfo(params = {}) {
	console.log('params:', params)
	const {pmid = '',size='300x300', max_age=2592000} = params
	if (!pmid) {
		return [false, businessFailResponse("pmid不能为空")]
	}

	const cover = getTecentMusicCover({pmid, size, max_age})
	const data = {
		cover
	}
	return [true, successResponse(data)]
}