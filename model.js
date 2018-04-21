const fs = require('fs')
const ids = require('short-id')
const path = './books.json'

const books = JSON.parse(fs.readFileSync(path))