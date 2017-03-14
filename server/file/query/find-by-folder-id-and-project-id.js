'use strict'

const model = require('../mongo/model')

module.exports = (folderId, projectId) =>
	model
		.find({ parentId: folderId, projectId: projectId })
		.lean()
		.exec()
