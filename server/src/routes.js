const CoffeeController = require('./controllers/CoffeeController')
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const BlogController = require('./controllers/BlogController')
const UploadController = require('./controllers/UploadController')

const requireAuth = require('./middleware/auth')
const createImageUpload = require('./middleware/imageUpload')

const blogUpload = createImageUpload()            // → public/uploads/
const coffeeUpload = createImageUpload('coffee')  // → public/uploads/coffee/

module.exports = (app) => {

  // ===== Auth Routes =====
  app.post('/login', UserAuthenController.login)
  app.post('/register', UserAuthenController.register)

  // ===== Users Routes (ต้อง login ก่อน) =====
  app.get('/users', requireAuth, UserController.index)
  app.get('/user/:userId', requireAuth, UserController.show)
  app.post('/user', requireAuth, UserController.create)
  app.put('/user/:userId', requireAuth, UserController.put)
  app.delete('/user/:userId', requireAuth, UserController.remove)

  // ===== Coffee Routes =====
  app.get('/coffees', CoffeeController.index)
  app.get('/coffee/:coffeeId', CoffeeController.show)
  app.post('/coffee', requireAuth, CoffeeController.create)
  app.put('/coffee/:coffeeId', requireAuth, CoffeeController.update)
  app.delete('/coffee/:coffeeId', requireAuth, CoffeeController.delete)

  // ===== Blog Routes =====
  app.get('/blogs', BlogController.index)
  app.get('/blog/:blogId', BlogController.show)
  app.post('/blog', BlogController.create)
  app.put('/blog/:blogId', BlogController.put)
  app.delete('/blog/:blogId', BlogController.remove)

  // ===== Upload Routes =====
  app.post('/upload', blogUpload, UploadController.upload)
  app.post('/coffee-upload', coffeeUpload, UploadController.coffeeUpload)
}
