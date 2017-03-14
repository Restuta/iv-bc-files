'use strict'

const createOne = require('../command/create-one')
const findById = require('../query/find-by-id')

// todo restuta: add error handling
const createFile = req => {
	const fileMetadata = {
		parentId: req.query.parentId || 'root',
		projectId: req.query.projectId,
		name: req.file.originalname,
		size: req.file.size, // todo: calculate size
		type: 'FILE',
	}
	return createOne(fileMetadata)
}

module.exports = (req, res, next) => {
	createFile(req)
		.then(createdFile => findById(createdFile._id))
		.then(file => res.json(file))
		.catch(next)
}
