const express = require('express')
const model = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const fs = require('fs')
const helper = require('../helpers/helper')

const albums = {
    view: (req, res) => {
        sort = req.query.sortbydesc || 'DESC'
        const perPage = parseInt(req.query.per_page)
        let currentPages = (req.query.page - 1) * perPage
        model.albums.findAll({
            where: { title: { [Op.like]: `%${req.query.q}%` } },
            offset: currentPages, limit: perPage,
            order: [['id', sort]],
            group: 'id'

        }).then((result) => {
            model.albums.findAll({
                where: { title: { [Op.like]: `%${req.query.q}%` } },
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
                    pagination : {
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
        const data = req.body
        model.albums.create(data)
        .then((result) => {
            return helper.response(200, 'success', 'created successfully', result, res)
        })
        .catch((error) => {
            return helper.response(401, 'error', null, error, res)
        })
    },
    update: (req, res) => { 
        const data = req.body
        model.albums.update(data, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            if (result[0] === 0) {
                return helper.response(400, 'error', 'Id Not Found', [], res)
            }
            return helper.response(200, 'success', 'update successfully', result[0], res)
        })
            .catch((error) => {
                return helper.response(401, 'error', null, error, res)
            })
    },
    delete: (req, res) => {
        model.albums.destroy({
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
module.exports = albums