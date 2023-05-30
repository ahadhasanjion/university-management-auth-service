import express, { Application } from "express"
var cors = require('cors')
var app:Application = express()
const port = 3000


app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

export default app;
