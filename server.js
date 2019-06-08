// server.js
const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)
const port = process.env.PORT || 3000

// Without express
const {createServer} = require('http')
app.prepare().then(() => {
  createServer(handler).listen(port)
})