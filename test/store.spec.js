'use strict'

const chai = require('chai')
// const sinon = require('sinon')
const { expect } = chai
chai.use(require('dirty-chai'))
chai.should()
// chai.use(require('sinon-chai'))

const { FlexDocStore } = require('../src/store')

describe('FlexDocStore', () => {
  it('should exist', () => {
    const store = new FlexDocStore({})
    expect(store).to.exist()
  })
})
