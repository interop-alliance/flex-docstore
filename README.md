# Flexible Document Store _(flex-docstore)_

> JSON Document store with flexible backend (files on fs, PouchDB, etc)

## Table of Contents

- [Security](#security)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Security

TBD

## Background

TBD

## Install

Requires Node.js 8.10+.

```
npm install flex-docstore
```

## Usage

### Requiring

```js
const { FlexDocStore } = require('flex-docstore')
```

### FS Backend (one file per object)

```js
const store = FlexDocStore.using('files', { dir: './db' })
```

### Mock Backend (for unit testing)

```js
const store = FlexDocStore.using('mock')
```

## API

The storage API is based on the [PouchDB API](https://pouchdb.com/api.html)

* `post` is not implemented (use uuid + `put`)

##### get
`async get (key)`

Retrieves the document at a given key (null if not found).

```js
const data = await store.get('key1')
```

##### put
`async put (key, value)`

Writes a document to a given key.

```
await store.put('key1', doc)
```

##### remove
`async remove (key)`

Deletes a document.

```
await store.remove('key1')
```

##### allDocs
`async allDocs ()`

Lists all documents in the store.

```
await store.allDocs({ include_docs: false })
```

## Contribute

PRs accepted.

Code style: [Standard JS](https://standardjs.com/rules.html)

Comments style: JSDoc.

README style: If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT LICENSE](LICENSE) © Interop Alliance, Dmitri Zagidulin
