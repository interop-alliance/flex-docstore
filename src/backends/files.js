'use strict'

const { promisify } = require('util')
const glob = promisify(require('glob'))
const path = require('path')

const { Store } = require('fs-json-store')

class FlexFileStore {
  /**
   * @param [options={}]
   */
  constructor (options = {}) {
    this.dir = options.dir || options.collection
    this.extension = options.extension || '.json'
  }

  fileFor (key) {
    const filename = encodeURIComponent(key) + this.extension
    return new Store({ file: path.join(this.dir, filename) })
  }

  async get (key) {
    return this.fileFor(key).read()
  }

  async put (key, data) {
    return this.fileFor(key).write(data)
  }

  async remove (key) {
    return this.fileFor(key).remove()
  }

  async allDocs () {
    return glob(path.join(this.dir, '*' + this.extension))
  }
}

module.exports = FlexFileStore
