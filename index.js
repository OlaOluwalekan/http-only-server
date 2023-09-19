const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))

app.use(express.json())

app.get('/', (req, res) => {
  // console.log('sending')
  // res.status(201).json({ user: 'ola' })
  res
    .status(202)
    .cookie('name', 'John Doe', {
      path: '/',
      expires: new Date(new Date().getTime() + 10000),
      httpOnly: true,
    })
    .send('cookie sent')
})

app.get('/api/v1/user', (req, res) => {
  console.log('sending')
  res.status(201).json({ user: 'ola' })
})

app.listen('9000', console.log(`server is listening on port 9000...`))
