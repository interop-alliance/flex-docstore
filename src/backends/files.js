'use strict'

const { promisify } = require('util')
const glob = promisify(require('glob'))
const path = require('path')

const { Store: FileStore } = require('fs-json-store')

class FlexFileBackend {
  /**
   * @param [dir] {string}
   * @param [collection] {string}
   * @param [extension] {string}
   */
  constructor ({ dir, collection, extension = '.json' } = {}) {
    if (!dir && !collection) {
      throw new TypeError('Either "dir" or "collection" param is required.')
    }
    this.dir = dir || collection
    this.extension = extension
  }

  /**
   * Loads the object for a given key.
   *
   * @param key {string}
   * @returns {Promise<object>} Parsed JSON object
   */
  async get (key) {
    return this._fileFor(key).read()
  }

  /**
   * Writes the object (automatically serializes) at a given key.
   * @param key {string}
   * @param data {object}
   * @returns {Promise<object>}
   */
  async put (key, data) {
    return this._fileFor(key).write(data)
  }

  /**
   * Deletes an object at a given key.
   * @param key {string}
   * @returns {Promise}
   */
  async remove (key) {
    return this._fileFor(key).remove()
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
    const keys = (await glob(path.join(this.dir, '*' + this.extension)))
      .map(filePath => this._keyForPath(filePath))

    const docs = {}
    if (include_docs) {
      for (const key of keys) {
        docs[key] = await this.get(key)
      }
    }

    return {
      offset: 0,
      total_rows: keys.length,
      rows: keys.map(key => {
        const row = { id: key }
        if (include_docs) {
          row.doc = docs[key]
          row.doc._id = key
        }
        return row
      })
    }
  }

  /**
   * Returns file store instance for a given key.
   * @param key {string}
   * @private
   * @return {FileStore} fs-json-store
   */
  _fileFor (key) {
    const filename = encodeURIComponent(key) + this.extension
    return new FileStore({ file: path.join(this.dir, filename) })
  }

  /**
   * Returns the key for a given path. Used by `allDocs()`.
   * @param filePath {string}
   * @returns {string}
   * @private
   */
  _keyForPath (filePath) {
    return decodeURIComponent(path.basename(filePath, this.extension))
  }
}

module.exports = FlexFileBackend
