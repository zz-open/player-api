export function getServerUrl(ctx) {
    const protocol = ctx.request.protocol; // 获取协议
    const host = ctx.request.host; // 获取主机名
    const fullUrl = `${protocol}://${host}`; // 拼接成完整的 URL
    console.log('ctx.request:', ctx.request)
    return fullUrl
}