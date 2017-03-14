'use strict'

const findById = require('../query/find-by-project-id')

module.exports = (req, res, next) => {
	findById(req.query.projectId)
		.then(files => res.json(files))
		.catch(next)
}
