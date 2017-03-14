'use strict'

const createOne = require('../command/create-one')
const findById = require('../query/find-by-id')

const createFolder = req => {
	console.info(req.body.name)
	throw new Error()

	const fileMetadata = {
		parentId: req.query.parentId || 'root',
		projectId: req.query.projectId,
		name: req.body.name,
		size: 0, // initially all created folders are empty
		type: 'FOLDER',
	}
	return createOne(fileMetadata)
}

module.exports = (req, res, next) => {
	createFolder(req)
		.then(createdFile => findById(createdFile._id))
		.then(file => res.json(file))
		.catch(next)
}
