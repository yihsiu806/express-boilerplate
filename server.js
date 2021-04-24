const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// Basic route
// app.METHOD(PATH, HANDLER)
// METHOD: get, post, put, delete
// PATH: string, string pattern, reqular expression
app.get('/user', (req, res) => {
  res.send('Hello World!')
})

app.post('/user', (req, res) => {
  res.send('Got a POST request')
})

app.put('/user', (req, res) => {
  res.send('Got a PUT request')
})

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request')
})

app.all('/user', function (req, res, next) {
  console.log('Accessing the secret setion ...')
  next()
})

app.get(/.*fly$/, function (req, res) {
  res.send('match butterfly and dragonfly')
})

// Serve Static File
app.use(express.static('public'))
app.use('/public', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

// Route Parameter
// Route path: /users/:userId/books/:bookId
// Request URL: http://localhost:3000/users/34/books/8989
// req.params: { "userId": "34", "bookId": "8989" }
// [a-zA-Z0-9_]
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})

// Multiple Handlers
let cb0 = (req, res) => { res.append('Custom-Header-0', 'cb0'); next(); }
let cb1 = (req, res) => { res.append('Custom-Header-1', 'cb1'); next(); }
let cb2 = (req, res) => { res.send('Hello from C!') }
app.get('/example/c', [cb0, cb1, cb2])

// app.route()
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })

// express Router
// /api, /api/name
const api = require('./api')
app.use('/api', api)

// Response
// res.download()
// res.end()
// res.json()
// res.jsonp()
// res.redirect()
// res.render()
// res.send()
// res.sendFile()
// res.sendStatus()

app.get('/cookie', function (req, res) {

  res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')

  // Content-Disposition: attachment; filename="logo.png"
  // Content-Type: image/png
  res.attachment('path/to/logo.png')

  // Set-Cookie: <cookie-name>=<cookie-value>
  // Set-Cookie: id=a3fWa; Expires=Thu, 31 Oct 2021 07:28:00 GMT;
  // Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly
  // Secure: HTTPS
  // HttpOnly: Inaccessible to Document.cookie API
  // The Domain attribute specifies which hosts are allowed to receive the cookie.
  // The Path attribute indicates a URL path that must exist in the requested URL
  res.status(201)
    .cookie('access_token', 'Bear', {
      expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
    })
    .redirect(301, '/admin')
  res.clearCookie('name')

  res.download('/report-1.pdf')

  res.status(404).end()

  res.status(500).json({ error: 'message' })

  res.redirect(301, 'http://example.com')
  res.redirect('../login')

  res.sendStatus(403)
  res.sendStatus(500)
  res.status(403).end()

  res.set('Content-Type', 'text/plain')
  res.set({
    'Content-Type': 'text/plain',
    'Content-Length': '123',
  })

  res.type('html')
  res.type('json')
  res.type('png')

  res.sendFile(fileName, { root: path.join(__dirname, 'public') }, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })

  res.sendFile('/uploads/123.html')
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// 404 not found
app.use((req, res, next) => {
  res.status(404).sendFile('public/404.html', { root: __dirname })
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
