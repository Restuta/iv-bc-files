'use strict'

const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require('../../lib/s3')

const uploader = multer({
	storage: multerS3({
		s3,
		bucket: 'coding-challenges',
		key: (req, file, cb) => {
			const projectId = req.query.projectId
			console.info(file)
			return cb(null, `/projects/${projectId}/${Date.now()}/${file.originalname}`)
		},
	}),
})

module.exports = uploader
