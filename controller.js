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

  if (!id) return next({status: 400, message: `Book ID is required.`})

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

  if (!name || !description || !authors) return next({status: 400, message: `Name, description and authors are required to add book.`})

  const book = model.createBook(name, borrowed, description, authors)

  res.status(201).json({data:book})
}

// ===========================================
// PUT, Update book
// ===========================================

const updateBook = (req, res, next) => {
  const id = req.params.id
  const { name, borrowed, description, authors } = req.body

  if (!id) return next({status: 400, message: `Book ID is required to update.`})

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

  if (!id) return next({status: 400, message: `Book ID is required.`})

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

  if (!id) return next({status: 400, message: `A book ID or name is required.`})

  const authors = model.getAllAuthors(id, name)

  if (authors.error) {
    let {error, message} = authors;
    return res.status(error).json({error: {message}})
  }

  res.status(200).json({data: authors})
}

// ===========================================
// GET, Read authors data by id
// ===========================================

const getAuthorById = (req, res, next) => {
  const id = req.params.id
  const authId = req.params.authId

  if (!id || !authId) return next({ status: 400, message: `Book ID and Author ID required` })

  const author = model.getAuthorById(id, authId)

  if (author.error) {
    let { error, message } = author;
    return res.status(error).json({ error: { message } })
  }

  res.status(200).json({ data: author })
}

// ===========================================
// POST, Create author
// ===========================================

const createAuthor = (req, res, next) => {
  const id = req.params.id
  const { first_name, last_name } = req.body

  if (!id || !first_name || !last_name) return next({ status: 400, message: `Book ID, author's firstname and author lastname are required.` })

  const author = model.createAuthor(id, first_name, last_name)

  if (author.error) {
    let { error, message } = author;
    return res.status(error).json({ error: { message } })
  }

  res.status(201).json({ data: author })
}

// ===========================================
// PUT, Update author
// ===========================================

const updateAuthor = (req, res, next) => {
  const id = req.params.id
  const authId = req.params.authId
  const {first_name, last_name} = req.body

  if (!id || !authId) return next({status: 400, message: `Book ID, author's firstname and lastname are required.`})

  const author = model.updateAuthor(id, authId, first_name, last_name)

  if (author.error) {
    let {error, message} = author;
    return res.status(error).json({error: {message}})
  }

  res.status(201).json({data: author})
}

// ===========================================
// DELETE, Destroy author
// ===========================================

const deleteAuthor = (req, res, next) => {
  const id = req.params.id
  const authId = req.params.authId

  if (!id || !authId) return next({status: 400, message: `Book ID and Author are ID required`})

  const author = model.deleteAuthor(id, authId)

  if (author.error) {
    let { error, message } = author;
    return res.status(error).json({ error: { message }})
  }

  res.status(200).json({data: author})
}



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