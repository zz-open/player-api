import { queryCoverInfo } from '../../../apis/tecent/index.js'

const handleCoverInfo = async (ctx, next) => {
	const {pmid, size, max_age} = ctx.request.query;
	const [flag, res] = await queryCoverInfo({pmid, size, max_age})
	
	ctx.set('Content-Type', 'text/plain; charset=utf-8');
	if (!flag) {
		ctx.body = res
		return
	}

	ctx.redirect(res.data.cover)
	return
}

export {handleCoverInfo}