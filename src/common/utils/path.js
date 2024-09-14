import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const __dirname = path.resolve(fileURLToPath(import.meta.url), '../../../')

export function projectRootPath() {
  const rootPath = path.resolve(__dirname)
  return rootPath
}

export function resolvePath(relativePath) {
  return path.resolve(projectRootPath(), relativePath)
}
