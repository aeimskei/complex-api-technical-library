const model = require('./model')

// ===========================================
// GET, Read books data
// ===========================================

const getAllBooks = (req, res, next) => {
  const books = model.getAllBooks()

  res.status(200).json({data: books})
}

// ===========================================
// GET, Read books by id
// ===========================================

const getBookById = (req, res, next) => {
  const id = req.params.id

  if (!id) return next({status: 400, message: `Book ID is required`})

  const book = model.getBookById(id)

  if (book.error) {
    let {error, message} = book;
    return res.status(error).json({error: {message}})
  }

  res.status(200).json({data: book})
}

// ===========================================
// POST, Create book
// ===========================================

const createBook = (req, res, next) => {
  const { name, borrowed, description, authors } = req.body

  if (!name || !description || !authors) return next({status: 400, message: `Name, description and authors are required to add book`})

  const book = model.createBook(name, borrowed, description, authors)

  res.status(201).json({data:book})
}

// ===========================================
// PUT, Update book
// ===========================================

const updateBook = (req, res, next) => {
  const id = req.params.id
  const { name, borrowed, description, authors } = req.body

  if (!id) return next({status: 400, message: `Book ID is required to update`})

  const book = model.updateBook(id, name, borrowed, description, authors)

  if (book.error) {
    let {error, message} = book;
    return res.status(201).json({error: {message}})
  }

  res.status(201).json({data: book})
}

// ===========================================
// DELETE, Destroy book
// ===========================================

const deleteBook = (req, res, next) => {
  const id = req.params.id

  if (!id) return next({status: 400, message: `Book ID is required`})

  const book = model.deleteBook(id)

  if (book.error) {
    let {error, message} = book;
    return res.status(error).json({error: {message}})
  }

  res.status(200).json({data: book})
}

// ===========================================
// GET, Read all authors data
// ===========================================

const getAllAuthors = (req, res, next) => {
  const id = req.params.id
  const name = req.body.name

  if (!id) return next({status: 400, message: `A book ID or name is required`})

  const authors = model.getAllAuthors(id, name)

  if (authors.error) {
    let {error, message} = authors;
    return res.status(error).json({error: {message}})
  }

  res.status(200).json({data: authors})
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAllAuthors
}