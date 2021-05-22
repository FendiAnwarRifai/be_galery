const express = require('express')
const router = express.Router()

const routerAlbums = require('./albums')
const routerPhotos = require('./photos')

router.use('/albums', routerAlbums)
router.use('/photos', routerPhotos)
module.exports = router