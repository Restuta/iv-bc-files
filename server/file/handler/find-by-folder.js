'use strict'

const findByFolderAndProject = require('../query/find-by-folder-id-and-project-id')

module.exports = (req, res, next) => {
	findByFolderAndProject(req.params.folderId, req.query.projectId)
		.then(files => res.json(files))
		.catch(next)
}
