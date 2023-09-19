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

const name = 'Mike David'

app.get('/', (req, res) => {
  console.log('sending')
  res.status(201).json({ user: 'ola' })
})

app.get('/create/:id', (req, res) => {
  res
    .status(202)
    .cookie('name', req.params.id, {
      path: '/',
      expires: new Date(new Date().getTime() + 86400000),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    .send('cookie sent')
})

app.get('/delete', (req, res) => {
  res.status(202).clearCookie('name').send('deleted')
})

app.get(
  '/post',
  (req, res, next) => {
    const token = req.cookies.name
    if (!token) {
      return res.status(401).json({ err: 'no token' })
    }

    if (token !== name) {
      return res.status(401).json({ err: 'invalid token' })
    }
    // console.log(token)
    req.name = token
    next()
  },
  (req, res) => {
    res.status(200).json({ name: req.name, age: 24, position: 'developer' })
  }
)

app.listen('9000', console.log(`server is listening on port 9000...`))
