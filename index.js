const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(bodyParser.json())


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app