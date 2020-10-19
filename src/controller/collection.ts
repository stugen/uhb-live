import { collectionRepository } from '../helper/database'
import { DeleteResult } from 'typeorm'
import { Collection } from '../models/Collection'

/**
 * Get the details of a collection.
 * @param shortName {String} The (URL)-slug of the collection.
 */
export const getCollectionByName = (shortName: string): Promise<Collection> => {
  return collectionRepository.findOne({
    where: {
      shortName
    }
  })
}

/**
 * Get a list of all collections set up in the database.
 */
export const getAllCollections = (): Promise<Collection[]> => {
  return collectionRepository.find({
    order: {
      shortName: 'ASC'
    }
  })
}

/**
 * Deletes a collection from the database permanently.
 * @param uuid {String} The uuid of the collection to delete.
 */
export const deleteCollection = async (uuid: string): Promise<DeleteResult> => {
  return collectionRepository.delete({
    uuid
  })
}

/**
 * Creates a new collection entity in the database.
 * @param name {String} The displayname.
 * @param shortName {String} The URL slug. Must be unique.
 * @param description {String} Description text of the collection. Accepts markdown-formatting.
 */
export const addNewCollection = async (name: string, shortName: string, description: string): Promise<Collection> => {
  const collection = new Collection()
  collection.name = name
  collection.shortName = shortName
  collection.description = description
  return collectionRepository.save(collection)
}

/**
 * Overwrites an existing collection entity with new properties.
 * @param uuid {String} The uuid of the existing collection.
 * @param name {String} The displayname.
 * @param shortName {String} The URL slug. Must be unique.
 * @param description {String} Description text of the collection. Accepts markdown-formatting.
 */
export const updateCollection = async (
  uuid: string,
  name: string,
  shortName: string,
  description: string
): Promise<Collection> => {
  const collection = await collectionRepository.findOne({
    uuid
  })
  collection.name = name
  collection.shortName = shortName
  collection.description = description
  return collectionRepository.save(collection)
}
