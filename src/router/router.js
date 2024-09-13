import {v1_0_0_NeteaseRouter,v1_0_0_TecentRouter} from './v1.0.0/index.js'

export function initRouter(app) {
    const routes = [
        v1_0_0_NeteaseRouter, 
        v1_0_0_TecentRouter
    ]
    
    routes.forEach(route => {
        app.use(route.routes(), route.allowedMethods())
    })
}