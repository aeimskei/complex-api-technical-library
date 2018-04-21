const fs = require('fs')
const ids = require('short-id')
const path = './books.json'

const books = JSON.parse(fs.readFileSync(path))

// ===========================================
// GET, Read books data
// ===========================================

function getAllBooks() {
  return books;
}

function getBookById(id) {
  const book = books.find(book => book.id === id)

  if (!book) {
    return {error: 404, message: `Sorry, book with id ${id} was not found.`}
  } else {
    return book;
  }
}

