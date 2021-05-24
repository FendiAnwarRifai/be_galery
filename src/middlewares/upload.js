var multer = require('multer')
const helper = require('../helpers/helper')
const fs = require('fs')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage }).single('images')
exports.fileUpload = (req, res, next) => {
    upload (req, res, function (error) {
        if (!req.file) {
            return helper.response(400, 'error', 'the image field is still empty', [], res)
        }
        const path = `./images/${req.file.filename}` //the location of the images
        if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
            fs.unlinkSync(path) // delete the images
            return helper.response(400, 'error', 'Only .png, .jpg and .jpeg format allowed!', [], res)
        }
        else if (req.file.size >= 4388608) {
            fs.unlinkSync(path) // delete the images
            return helper.response(400, 'error', 'Image size is too large, it must be under 4MB', [], res)
        }
        return next()
    })
}
