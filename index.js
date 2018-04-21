const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const bodyParser = require('body-parser')
const controller = require('./controller')

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(bodyParser.json())

// ===========================================
// Book Routes (GET/POST/PUT/DELETE)
// ===========================================

app.get('/books', controller.getAllBooks)
app.get('/books/:id', controller.getBookById)
app.post('/books', controller.createBook)
app.put('/books/:id', controller.updateBook)
app.delete('/books/:id', controller.deleteBook)

// ===========================================
// Author Routes (GET/POST/PUT/DELETE)
// ===========================================

app.get('/books/:id/authors', controller.getAllAuthors)
app.get('/books/:id/authors/:authId', controller.getAuthorById)


// ===========================================
// Error handling
// ===========================================
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({error: err})
})

app.use((req, res, next) => {
  res.status(404).json({error: {message: `Not found`}})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app