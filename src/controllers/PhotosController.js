const express = require('express')
const model = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const fs = require('fs')
const helper = require('../helpers/helper')

const labels = {
    view: (req, res) => {
        sort = req.query.sortbydesc || 'DESC'
        const perPage = parseInt(req.query.per_page)
        let currentPages = (req.query.page - 1) * perPage
        model.photos.findAll({
            where: { albumId: req.query.albumId, title: { [Op.like]: `%${req.query.q}%` } },
            offset: currentPages, limit: perPage,
            order: [['id', sort]]

        }).then((result) => {
            model.photos.findAll({
                where: { albumId: req.query.albumId, title: { [Op.like]: `%${req.query.q}%` } },
            }).then((result2) => {
                let to = currentPages + perPage
                if (to >= result2.length) {
                    to = result2.length
                }
                res.json({
                    status: {
                        code: 200,
                        response: 'success',
                        message: 'success get all data',
                    },
                    pagination: {
                        from: currentPages + 1,
                        to: to,
                        currentPages: currentPages,
                        per_page: perPage,
                        rows: result2.length
                    },
                    result: result
                })
            })
        })
            .catch((error) => {
                return helper.response(401, 'error', null, error, res)
            })
    },
    create: (req, res) => {
        let data = req.body
        let TotalPhotos = 0
        data = JSON.parse(JSON.stringify(data))
        const path = `./images/${req.file.filename}` //the location of the images
        model.photos.findAll({
            where: { albumId: req.params.id }
        }).then((res)=>{
            TotalPhotos = res.length
        })
        setTimeout(() => {
            if (TotalPhotos === 50) {
                fs.unlinkSync(path) // delete the images
                return helper.response(400, 'error', '1 album can only contain 50 photos', [], res)
            }
             model.albums.findAll({ where: { id: req.params.id } })
             .then((result2) => {
                // cek id album
                if (result2.length === 0) {
                    fs.unlinkSync(path) // delete the images
                    return helper.response(404, 'error', 'Id Album Not Found', [], res)
                }

                data.albumId = req.params.id
                data.url = `${process.env.BASE_URL}/images/${req.file.filename}`
                data.thumbnailUrl = `${process.env.BASE_URL}/images/${req.file.filename}`
                model.photos.create(data)
                .then((result) => {
                    return helper.response(200, 'success', 'data was updated successfully', data, res)
                })
                .catch((err) => {
                fs.unlinkSync(path) // delete the images
                    return helper.response(401, 'error', null, err, res)
                })
            })
        }, 100);
    },
    update: (req, res) => {
        data = req.body
        model.photos.update(data,{
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (result[0] === 0) {
                    return helper.response(404, 'error', 'Id Photos Not Found', [], res)
                }
                return helper.response(200, 'success', 'update data successfully', result, res)
            })
            .catch((error) => {
                return helper.response(401, 'error', null, error, res)
            })
    },
    delete: (req, res) => {
        model.photos.destroy({
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (result === 0) {
                    return helper.response(404, 'error', 'Id Not Found', [], res)
                }
                return helper.response(200, 'success', 'data deleted successfully', [], res)
            })
            .catch((error) => {
                return helper.response(401, 'error', null, error, res)
            })
    }
}
module.exports = labels