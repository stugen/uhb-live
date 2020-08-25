import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

export const sourceRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../')
export const baseDir = resolve(sourceRoot, '../')
