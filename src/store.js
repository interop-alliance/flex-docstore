'use strict'

const FlexFileStore = require('./backends/files')
const MemoryStore = require('./backends/memory')

const DEFAULT_COLLECTION = 'db'

class FlexDocStore {
  /**
   *
   * @param backend {Backend} Backend implementing the Store API.
   * @param [modelClass] {object} Used for deserializing objects into model
   *   instances.
   * @param [collection] {string} Collection name.
   */
  constructor ({ backend, modelClass, collection = DEFAULT_COLLECTION }) {
    this.backend = backend
    this.modelClass = modelClass
    this.collection = collection
  }

  /**
   * Constructor method, returns a Store instance using a given persistence
   * backend method.
   * @param type {string} Backend type. 'files' / 'memory'
   * @param options {object} Backend-specific options
   *
   * @returns {FlexDocStore}
   */
  static using (type, options) {
    let backend

    switch (type) {
      case 'file':
      case 'files':
        backend = new FlexFileStore(options)
        break
      case 'mock':
      case 'memory':
      default:
        backend = new MemoryStore(options)
        break
    }

    return new FlexDocStore({ backend, ...options })
  }

  /**
   * Loads the document for a given key.
   *
   * @param key {string}
   * @returns {Promise<object>}
   */
  async get (key) {
    this.validateKey(key)

    const doc = await this.backend.get(key)
    if (!this.modelClass || !doc) {
      return doc // resolve with raw JSON
    }

    return this.modelClass.from(doc || {})
  }

  async put (key, data) {
    this.validateKey(key)

    return this.backend.put(key, data)
  }

  async remove (key) {
    this.validateKey(key)

    return this.backend.remove(key)
  }

  /* eslint-disable camelcase */
  /**
   * Returns all the objects in the store.
   *
   * @param {boolean} [include_docs=false] Whether to include the documents
   *   as well; when false, returns just a list of keys.
   *
   * @returns {Promise<Array<string>|Array<object>>}
   */
  async allDocs ({ include_docs = false } = {}) {
    return this.backend.allDocs({ include_docs })
  }

  validateKey (key) {
    if (!key) {
      throw new Error('Key cannot be empty')
    }
  }
}

module.exports = {
  FlexDocStore
}
