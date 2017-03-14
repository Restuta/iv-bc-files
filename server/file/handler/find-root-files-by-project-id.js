'use strict'

const findByProjectId = require('../query/find-root-files-by-project-id')

module.exports = (req, res, next) => {
	findByProjectId(req.query.projectId)
		.then(files => res.json(files))
		.catch(next)
}
