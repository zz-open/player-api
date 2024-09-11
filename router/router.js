import {neteaseRouter} from './netease.js'
import {tecentRouter} from './tecent.js'

export function useAddRouter(app) {
    const routes = [neteaseRouter, tecentRouter]
    routes.forEach(route => {
        app.use(route.routes(), route.allowedMethods())
    })
}