import { Schema } from 'convict'
import randomstring from 'randomstring'

interface ConfigSchema {
  port: number;
  bind: string;
  dbType: 'mariadb' | 'sqlite';
  dbUrl: string;
  tokenSecret: string;
  gitlabHost: string;
  gitlabClientId: string;
  gitlabClientSecret: string;
  gitlabGroup: number;
}

export const configSchema: Schema<ConfigSchema> = {
  port: {
    doc: 'Port on which the application will launch.',
    format: 'port',
    default: 3500,
    env: 'STR_PORT'
  },
  bind: {
    doc: 'Host IP address the application will bind to.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'STR_BIND'
  },
  dbType: {
    doc: 'Type of the database that should be used.',
    format: ['mariadb', 'sqlite'],
    default: 'sqlite',
    env: 'STR_DBTYPE'
  },
  dbUrl: {
    doc: 'Connection URL of the database that should be used.',
    format: String,
    default: 'sqlite:./uhb-stugen-stream.db',
    env: 'STR_DBURL'
  },
  tokenSecret: {
    doc: 'Secret that is being used to encrypt session tokens.',
    format: String,
    default: randomstring.generate(),
    env: 'STR_TOKENSECRET'
  },
  gitlabHost: {
    doc: 'The GitLab host that should be used for oauth2 login.',
    format: 'url',
    default: 'https://gitlab.informatik.uni-bremen.de/',
    env: 'STR_GLHOST'
  },
  gitlabClientId: {
    doc: 'The client id of the oauth2 app registered at the GitLab instance.',
    format: String,
    default: '',
    env: 'STR_GLCLIENTID'
  },
  gitlabClientSecret: {
    doc: 'The client secret of the oauth2 app registered.',
    format: String,
    default: '',
    env: 'STR_GLCLIENTSECRET'
  },
  gitlabGroup: {
    doc: 'The numeric id of the GitLab group that the user must be member of to login.',
    format: 'int',
    default: 0,
    env: 'STR_GLGROUP'
  }
}
