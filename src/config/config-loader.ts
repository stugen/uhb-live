import convict from 'convict'
import fs from 'fs'
import path from 'path'
import convictFormatValidator from 'convict-format-with-validator'
import yaml from 'js-yaml'
import { configSchema } from './schema'
import { baseDir } from '../helper/paths'

convict.addFormats(convictFormatValidator)
convict.addParser({
  extension: ['yml', 'yaml'],
  parse: yaml.safeLoad
})

const config = convict(configSchema)
const configFilePath = path.join(baseDir, 'config.yml')

if (fs.existsSync(configFilePath)) {
  config.loadFile(configFilePath)
}
config.validate()

export { config }
