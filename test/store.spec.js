'use strict'

const chai = require('chai')
// const sinon = require('sinon')
const { expect } = chai
chai.use(require('dirty-chai'))
// chai.use(require('sinon-chai'))

const Store = require('../src/store')

describe('Store', () => {
  it('should exist', () => {
    const store = new Store({})
    expect(store).to.exist()
  })
})
