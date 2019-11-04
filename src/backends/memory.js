'use strict'

/**
 * In-memory document store api, for use with unit testing etc.
 */
class MemoryBackend {
  constructor (options = {}) {
    this._docs = options._docs || {}
  }

  /**
   * Loads the object for a given key.
   *
   * @param key {string}
   * @returns {Promise<object>} Parsed JSON object
   */
  async get (key) {
    return this._docs[key]
  }

  /**
   * Stores the object at a given key.
   * @param key {string}
   * @param value {object}
   * @returns {Promise<object>}
   */
  async put (key, value) {
    this._docs[key] = value
    return value
  }

  /**
   * Deletes an object at a given key.
   * @param key {string}
   * @returns {Promise}
   */
  async remove (key) {
    delete this._docs[key]
  }

  /* eslint-disable camelcase */
  /**
   * Returns all the object in this store.
   *
   * @param [include_docs=false] {boolean} Include document contents as well
   *   as keys?
   * @returns {Promise<{offset: number, total_rows: number, rows: Array<object>}>}
   */
  async allDocs ({ include_docs } = {}) {
    const keys = Object.keys(this._docs)

    return {
      offset: 0,
      total_rows: keys.length,
      rows: keys.map(key => {
        const row = { id: key }
        if (include_docs) {
          row.doc = this._docs[key]
          row.doc._id = key
        }
        return row
      })
    }
  }
}

module.exports = MemoryBackend
