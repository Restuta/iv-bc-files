'use strict'

const createOne = require('../command/create-one')
const findById = require('../query/find-by-id')

const createFile = (req) => {
	console.log('creating a File...')
	console.log(req.query)

	const fileMetadata = {
		parentId: req.query.parentId || 'root',
		projectId: req.query.projectId,
		name: 'name-placeholder',
		size: 8888, // todo: calculate size
		type: 'FILE',
	}
	return createOne(fileMetadata)
}

module.exports = (req, res, next) => {
	createFile(req)
		.then(createdFile => findById(createdFile._id))
		.then(project => res.json(project))
		.catch(next)
}
