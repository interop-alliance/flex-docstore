'use strict'

/**
 * Mock document store api, for use with unit testing etc.
 */
class MockStore {
  constructor (options = {}) {
    this._docs = options._docs || {}
  }

  async get (key) {
    return Promise.resolve(this._docs[key])
  }

  async put (key, value) {
    return Promise.resolve(this._docs[key] = value)
  }

  async remove (key) {
    return Promise.resolve(delete this._docs[key])
  }

  async allDocs () {}
}

module.exports = MockStore
