const router = require('express').Router();
const UserController = require('../controllers/UserController');
const protectedRoutes = require('../helpers/protectedRoutes');
const {imageUpload} = require('../helpers/imageUpload')
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/finduser', UserController.findUser)
router.get('/:id', UserController.getUser)
router.patch('/edit/:id', protectedRoutes, imageUpload.single('image'),UserController.editUser)

module.exports = router