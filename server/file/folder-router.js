'use strict'

const router = require('express').Router()  // eslint-disable-line new-cap

router.post('/', require('./handler/create-folder'))
router.get('/:folderId/items', require('./handler/find-by-folder'))

module.exports = router
