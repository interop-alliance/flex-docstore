'use strict'

const FlexFileStore = require('./backends/files')
const MemoryStore = require('./backends/memory')

const DEFAULT_COLLECTION = 'db'

class Store {
  constructor (options) {
    this.backend = options.backend
    this.className = options.className
    this.collection = options.collection || DEFAULT_COLLECTION
  }

  static using (type, options) {
    let backend

    switch (type) {
      case 'files':
        backend = new FlexFileStore(options)
        break
      case 'mock':
      case 'memory':
      default:
        backend = new MemoryStore(options)
        break
    }

    return new Store({ backend, ...options })
  }

  async get (key) {
    this.validateKey(key)

    const doc = await this.backend.get(key)
    if (!this.className) {
      return doc // resolve with raw JSON
    }

    return this.className.from(doc || {})
  }

  async put (key, data) {
    this.validateKey(key)

    return this.backend.put(key, data)
  }

  async remove (key) {
    this.validateKey(key)

    return this.backend.remove(key)
  }

  async allDocs () {
    return this.backend.allDocs()
  }

  validateKey (key) {
    if (!key) {
      throw new Error('Key cannot be empty')
    }
  }
}

module.exports = Store
