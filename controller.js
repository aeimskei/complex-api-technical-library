const model = require('./model')

// ===========================================
// GET, Read books data
// ===========================================

const getAllBooks = (req, res, next) => {
  const books = model.getAllBooks()

  res.status(200).json({data: books})
}

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
// POST, Create books
// ===========================================

const createBook = (req, res, next) => {
  const { name, borrowed, description, authors } = req.body

  if (!name || !description || !authors) return next({status: 400, message: `Name, description and authors are required to add book`})

  const book = model.createBook(name, borrowed, description, authors)

  res.status(201).json({data:book})
}



module.exports = {
  getAllBooks,
  getBookById,
  createBook
}