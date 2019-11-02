'use strict'

/**
 * In-memory document store api, for use with unit testing etc.
 */
class MemoryStore {
  constructor (options = {}) {
    this._docs = options._docs || {}
  }

  async get (key) {
    return this._docs[key]
  }

  async put (key, value) {
    this._docs[key] = value
    return value
  }

  async remove (key) {
    delete this._docs[key]
  }

  async allDocs () {}
}

module.exports = MemoryStore
