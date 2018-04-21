const fs = require('fs')
const ids = require('short-id')
const filePath = './books.json'

const books = JSON.parse(fs.readFileSync(filePath))

// ===========================================
// GET, Read all books data
// ===========================================

function getAllBooks() {
  return books;
}
// TEST: http GET localhost:3000/books

// ===========================================
// GET, Read books by id
// ===========================================

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
// POST, Create book
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

// http POST localhost:3000/books name='New Book'  description='This book contains cool stuff.'  authors:='[{"first_name": "Bob", "last_name": "Mill"}]'

// ===========================================
// PUT, Update book
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

// ===========================================
// DELETE, Destroy book
// ===========================================

function deleteBook(id) {
  const book = books.find(book => book.id === id)

  if (!book) {
    return {error: 404, message: `Book id of ${id} was not found.`}
  }

  const index = books.indexOf(book)
  books.splice(index, 1)
  fs.writeFileSync(filePath, JSON.stringify(books))

  return book;
}
// TEST: http DELETE localhost:3000/books/f041cd

// ===========================================
// GET, Read all authors data
// ===========================================

function getAllAuthors(id, name) {
  const book = getBookById(id)
  const authors = book.authors

  if (book.error) {
    return {error: 404, message: `Book with id ${id} not found.`}
  }

  return authors;
}
// TEST: http GET localhost:3000/books/bf3032

// ===========================================
// GET, Read authors data by id
// ===========================================

function getAuthorById(id, authId) {
  const book = getBookById(id)
  const authors = book.authors

  if (book.error) {
    return { error: 404, message: `Book with id ${id} not found.` }
  }

  const author = authors.find(author => author.id === authId)

  if (!author) {
    return { error: 404, message: `Author with id ${authId} not found.` }
  }

  return author;
}
// TEST: http GET localhost:3000/books/bf3032/authors/aa28a6

// ===========================================
// POST, Create author
// ===========================================

function createAuthor(id, first_name, last_name) {
  const book = books.find(book => book.id === id)
  const authors = book.authors

  if (book.error) {
    return { error: 404, message: `Book with id ${id} not found.` }
  }

  const addAuthor = {
    id: ids.generate(),
    first_name: first_name,
    last_name: last_name
  }
  authors.push(addAuthor)
  fs.writeFileSync(filePath, JSON.stringify(books))

  return addAuthor;
}
// TEST: http POST localhost:3000/books/aeb824/authors first_name='Patty' last_name='Pie'

// ===========================================
// PUT, Update author
// ===========================================

function updateAuthor(id, authId, first_name, last_name) {
  const author = getAuthorById(id, authId)

  if(!author) {
    return { error: 404, message: `Author with id ${authId} not found.` }  
  }

  author.first_name = first_name,
  author.last_name = last_name
  fs.writeFileSync(filePath, JSON.stringify(books))

  return author;
}
// TEST: http PUT localhost:3000/books/47f4c4/authors/09967d first_name='Patty' last_name='Pie'

// ===========================================
// DELETE, Destroy author
// ===========================================

function deleteAuthor(id, authId) {
  const authors = getAuthorById(id, authId)

  if (book.error) {
    return { error: 404, message: `Book with id ${id} not found.`}
  }

  const author = authors.find(author => author.id === authId);

  if (!author) {
    return { error: 404, message: `Author with id ${authId} not found.`}
  }

  const index = authors.indexOf(authId)
  authors.splice(index, 1)
  fs.writeFileSync(filePath, JSON.stringify(books))

  return author;
}
// TEST: http DELETE localhost:3000/books/47f4c4/authors/09967d


module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
}