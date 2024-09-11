import path from 'path'
import { fileURLToPath } from 'url'
import {APPLICATION_CONF_FILENAME} from '../../config/index.js'

export function projectRootPath(){
    const rootPath = path.resolve(fileURLToPath(import.meta.url), '../../../')
    return rootPath
}

export function resolvePath(relativePath) {
    return path.resolve(projectRootPath(), relativePath)
}

export function applicationConfPath() {
    return path.resolve(projectRootPath(), APPLICATION_CONF_FILENAME)
}