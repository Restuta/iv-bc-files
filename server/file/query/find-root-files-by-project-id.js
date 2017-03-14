'use strict'

const model = require('../mongo/model')

module.exports = projectId =>
	model
		.find({ projectId: projectId })
		.where('parentId', 'root')
		.lean()
		.exec()
