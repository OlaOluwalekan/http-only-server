const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'https://http-cookies.netlify.app'],
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  // console.log('sending')
  // res.status(201).json({ user: 'ola' })
  res
    .status(202)
    .cookie('name', 'John Doe', {
      path: '/',
      expires: new Date(new Date().getTime() + 86400000),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    .send('cookie sent')
})

app.get('/api/v1/user', (req, res) => {
  console.log('sending')
  res.status(201).json({ user: 'ola' })
})

app.get('/delete', (req, res) => {
  res.status(202).clearCookie('name').send('deleted')
})

app.listen('9000', console.log(`server is listening on port 9000...`))
