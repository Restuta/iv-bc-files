'use strict'

const createOne = require('../command/create-one')
const findById = require('../query/find-by-id')
const createMetadata = require('./create-file-metadata')

const createFolder = req => {
	const fileMetadata = createMetadata({
		parentId: req.query.parentId,
		projectId: req.query.projectId,
		name: req.body.name,
		type: 'FOLDER',
	})
	return createOne(fileMetadata)
}

module.exports = (req, res, next) => {
	createFolder(req)
		.then(createdFile => findById(createdFile._id))
		.then(file => res.json(file))
		.catch(next)
}
