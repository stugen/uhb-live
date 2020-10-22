import { StreamMetadata } from './StreamMetadata'

export const getMetadata = async (name: string): Promise<StreamMetadata> => {
  const sanitized = encodeURIComponent(name.replace(/\//, '').replace(/\./, ''))
  const response = await window.fetch(`/api/v1/stream/${sanitized}`, {
    mode: 'cors',
    cache: 'no-cache'
  })
  const json = await response.json() as unknown as StreamMetadata
  if (!response || !json) {
    throw new Error('Request failed.')
  }
  return json
}
