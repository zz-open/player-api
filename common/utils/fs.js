import {applicationConfPath} from './path.js'
import fs from 'fs'

export async function readFs(filePath){
    return fs.readFileSync(filePath, 'utf8')
}

export async function readJsonFs(filePath){
    const content = await readFs(filePath)
    if (!content) {
        return {}
    }

    return JSON.parse(content)
}

export async function readApplicationConf(){
    return await readJsonFs(applicationConfPath())
}