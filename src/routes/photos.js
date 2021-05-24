const express = require('express')
const router = express.Router()
const PhotosController = require('../controllers/PhotosController')
const { fileUpload } = require('../middlewares/upload')
router
    .get('/', PhotosController.view)
    .post('/create/:id', fileUpload, PhotosController.create)
    .patch('/update/:id', PhotosController.update)
    .delete('/delete/:id', PhotosController.delete)
module.exports = router