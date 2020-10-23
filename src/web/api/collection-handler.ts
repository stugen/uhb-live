import { Request, Response } from 'express'
import { FetchedData, sendControlledData } from '../common-requests'
import { verifyAttributes } from '../../helper/Verification'
import { addNewCollection, deleteCollection, getAllCollections, updateCollection } from '../../controller/collection'
import { Collection } from '../../models/Collection'

const TYPED_COLLECTION_ATTRIBUTES = [['uuid', 'string'], ['name', 'string'], ['shortName', 'string'],
  ['description', 'string']]

export const restGetCollection = (req: Request, res: Response): Promise<void> => {
  return sendControlledData(FetchedData.COLLECTION, req, res)
}

export const restGetAllCollections = async (req: Request, res: Response): Promise<void> => {
  try {
    const allCollections = await getAllCollections()
    if (!allCollections) {
      res.status(500).send()
    }
    res.json(allCollections)
  } catch (e) {
    res.status(500).send()
  }
}

export const restDeleteCollection = async (req: Request, res: Response): Promise<void> => {
  const uuid = req.params.uuid
  try {
    await deleteCollection(uuid)
    res.status(204).send()
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}

export const restPutCollection = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as Collection
  if (!verifyAttributes(data, TYPED_COLLECTION_ATTRIBUTES)) {
    res.status(400).send()
    return
  }
  const uuid = req.params.uuid
  try {
    const updated = await updateCollection(
      uuid,
      data.name,
      data.shortName,
      data.description
    )
    res.json(updated)
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}

export const restPostCollection = async (req: Request, res: Response): Promise<void> => {
  const data = req.body as Collection
  if (!verifyAttributes(data)) {
    res.status(400).send()
    return
  }
  try {
    const newCollection = await addNewCollection(
      data.name,
      data.shortName,
      data.description
    )
    res.json(newCollection)
  } catch (e) {
    console.error(e)
    res.status(500).send()
  }
}
