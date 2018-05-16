const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const sql = require('better-sqlite3')
const session = require('express-session')
const SqlStore = require('express-sql-session')(session)
const head = require('./lib/head.js')

app.set('view engine', 'pug')
app.use(
  express.static(path.join(__dirname, 'public')),
  session({
    secret: process.env.SESSION_SECRET,
    store: new SqlStore(),
    resave: false,
    saveUnitialized: false
  })
)

app.get('/', (req, res) => {
  res.render('studio', {
    styles: head.styles(),
    scripts: head.scripts()
  })
})

app.get('/preview', (req, res) => {
  res.render('live-room')
})

app.listen(3000, () => console.log('Server Is A Go'))
