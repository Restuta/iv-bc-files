'use strict'

const model = require('../mongo/model')

module.exports = id =>
	model
		.findOne({ _id: id })
		.lean()
		.exec()
