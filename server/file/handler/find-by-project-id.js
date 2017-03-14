'use strict'

const findByProjectId = require('../query/find-by-project-id')

module.exports = (req, res, next) => {
	findByProjectId(req.query.projectId)
		.then(files => res.json(files))
		.catch(next)
}
