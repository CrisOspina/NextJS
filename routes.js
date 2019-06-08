const routes = require('next-routes')

module.exports = routes()                           
.add('home', '/', 'index')                                       
.add('channel', '/:slug.:id', 'channel')                         
.add('podcasts', '/:slugChannel.:idChannel/:slug.:id','podcasts')