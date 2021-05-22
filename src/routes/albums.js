const express = require('express')
const router = express.Router()
const AlbumsController = require('../controllers/AlbumsController')
router
    .get('/', AlbumsController.view)
    .post('/create', AlbumsController.create)
    .patch('/update/:id', AlbumsController.update)
    .delete('/delete/:id', AlbumsController.delete)
module.exports = router