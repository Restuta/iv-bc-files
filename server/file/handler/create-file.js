'use strict'

const createOne = require('../command/create-one')
const findById = require('../query/find-by-id')
const createMetadata = require('./create-file-metadata')

const createFile = req => {
	const fileMetadata = createMetadata({
		parentId: req.query.parentId,
		projectId: req.query.projectId,
		name: req.file.originalname,
		size: req.file.size,
		type: 'FILE',
	})
	return createOne(fileMetadata)
}

module.exports = (req, res, next) => {
	createFile(req)
		.then(createdFile => findById(createdFile._id))
		.then(file => res.json(file))
		.catch(next)
}
