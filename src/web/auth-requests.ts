import { Request, Response } from 'express'
import fetch from 'node-fetch'
import url from 'url'
import jsonwebtoken from 'jsonwebtoken'
import { config } from '../config/config-loader'

const { sign, verify } = jsonwebtoken

interface GitLabTokenResponse {
  /* eslint-disable camelcase */
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  /* eslint-enable camelcase */
}

const clientJwtMap = new Map<string, string>()

const getSelfUrl = (req: Request): string => {
  const hostname = req.hostname
  let host = hostname
  if (hostname === 'localhost' && config.get('port') !== 80) {
    host += `:${config.get('port')}`
  }
  return url.format({
    protocol: req.protocol,
    host: host
  })
}

export const redirectLogin = (req: Request, res: Response): void => {
  if (!req.query.client) {
    res.status(400).send()
  }
  const clientId = req.query.client as string
  const self = getSelfUrl(req)
  const url = `${config.get('gitlabHost')}oauth/authorize?client_id=${config.get('gitlabClientId')}&response_type=code&state=${clientId}&scope=read_api&redirect_uri=${self}/auth/callback`
  res.redirect(url)
}

export const requestToken = (req: Request, res: Response): void => {
  if (!req.query.code || !req.query.state) {
    res.status(400).send()
  }
  const code = req.query.code as string
  const client = req.query.state as string
  const self = getSelfUrl(req)
  const url = `${config.get('gitlabHost')}oauth/token?client_id=${config.get('gitlabClientId')}&client_secret=${config.get('gitlabClientSecret')}&code=${code}&grant_type=authorization_code&redirect_uri=${self}/auth/callback`
  fetch(url, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(async (json: GitLabTokenResponse) => {
      if (!json.access_token) {
        res.redirect('/login#failed')
        return
      }
      const token = json.access_token
      const nameReq = await fetch(`${config.get('gitlabHost')}api/v4/user?access_token=${token}`)
      const nameRes = await nameReq.json() as {name: string}
      if (!nameReq || !nameRes) {
        res.redirect('/login#failed')
        return
      }
      const name = nameRes.name
      const groupReq = await fetch(`${config.get('gitlabHost')}api/v4/groups?min_access_level=10&access_token=${token}`)
      const groupRes = await groupReq.json() as {id: number}[]
      if (!groupReq || !groupRes) {
        res.redirect('/login#failed')
        return
      }
      const groups = groupRes.map(group => group.id)
      if (!groups.includes(config.get('gitlabGroup'))) {
        res.redirect('/login#failed')
        return
      }
      const jwt = sign({
        name: name
      }, config.get('tokenSecret'))
      clientJwtMap.set(client, jwt)
      res.redirect('/login')
    })
    .catch((error: Error) => {
      console.error(error)
      res.status(500).send()
    })
}

const verifyJwt = (req: Request, res: Response): void => {
  if (!req.headers.authorization) {
    res.status(400).send()
    return
  }
  const token = req.headers.authorization.replace(/^Bearer\s/, '')
  try {
    const data = verify(token, config.get('tokenSecret')) as {name: string, iat: number}
    if (!data) {
      res.status(400).send()
      return
    }
    if ((data.iat + 7200) * 1000 < Date.now()) {
      res.status(403).send()
    }
    res.json({
      loggedIn: true,
      name: data.name,
      token
    })
  } catch (e) {
    res.status(500).send()
  }
}

const getJwt = (req: Request, res: Response): void => {
  if (!req.query.client) {
    res.status(400).send()
    return
  }
  const client = req.query.client as string
  if (!clientJwtMap.has(client)) {
    res.status(403).send()
    return
  }
  const jwt = clientJwtMap.get(client)
  clientJwtMap.delete(client)
  req.headers.authorization = 'Bearer ' + jwt
  verifyJwt(req, res)
}

export const verifyResponse = (req: Request, res: Response): void => {
  if (req.query.client) {
    getJwt(req, res)
    return
  }
  verifyJwt(req, res)
}
