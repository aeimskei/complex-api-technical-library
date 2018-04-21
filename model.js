const fs = require('fs')
const ids = require('short-id')
const filePath = './books.json'

const books = JSON.parse(fs.readFileSync(filePath))

// ===========================================
// GET, Read books data
// ===========================================

function getAllBooks() {
  return books;
}
// TEST: http GET localhost:3000/books

function getBookById(id) {
  const book = books.find(book => book.id === id)

  if (!book) {
    return {error: 404, message: `Sorry, book with id ${id} was not found.`}
  } else {
    return book;
  }
}
// TEST: http GET localhost:3000/books/7fdf61

// ===========================================
// POST, Create books
// ===========================================

function createBook(name, borrowed, description, authors) {
  const books = getAllBooks()

  const addBook = {
    id: ids.generate(),
    name: name,
    borrowed: borrowed,
    description: description,
    authors: authors.map(author => {
      return {
        id: ids.generate(),
        first_name: author.first_name,
        last_name: author.last_name
      }
    })
  }

  books.push(addBook)
  fs.writeFileSync(filePath, JSON.stringify(books))

  return addBook;
}
// TEST: http POST localhost:3000/books name='Tribe of Mentors'  description='This book contains their answers—practical and tactical advice from mentors who have found solutions.'  authors:='[{"first_name": "Tim", "last_name": "Ferris"}]'

// ===========================================
// PUT, Update books
// ===========================================

function updateBook(id, name, borrowed, description, authors) {
  const book = getBookById(id)

  if (!book) {
    return {error: 404, message: `Book with id ${id} no found.`}
  }

  book.name = name
  book.description = description
  book.authors = authors
  fs.writeFileSync(filePath, JSON.stringify(books))

  return book;
}
// TEST: http PUT localhost:3000/books/f041cd authors:='[{"first_name":"Change", "last_name":"Author Name"}]'



module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
}