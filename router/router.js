import {neteaseRouter} from './netease.js'
import {qqRouter} from './qq.js'

export function useAddRouter(app) {
    const routes = [neteaseRouter, qqRouter]
    routes.forEach(route => {
        app.use(route.routes(), route.allowedMethods())
    })
}