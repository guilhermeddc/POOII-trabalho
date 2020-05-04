import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import EventsController from './app/controllers/EventsController'
import TypeController from './app/controllers/TypeController'
import AdminController from './app/controllers/AdminController'

import auth from './app/middlewares/auth'

const routes = new Router()
const upload = multer(multerConfig)

routes.get('/', (req, res) => res.json({ message: 'Api Running' }))

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(auth)

routes.put('/users', UserController.update)
routes.get('/admins', AdminController.index)
routes.post('/events', EventsController.store)
routes.post('/types', TypeController.store)

routes.post('/files', upload.single('file'), FileController.store)

export default routes