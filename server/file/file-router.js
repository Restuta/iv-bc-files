'use strict'

const router = require('express').Router()  // eslint-disable-line new-cap
const uploader = require('./s3-tools/uploader-middleware.js')

// This should upload the file, however, you'll still need to add another function after this
// uploader middleware to actually save a record of this file in Mongo
router.post('/',
	// chaining two middlewares to update mongo after S3 is done
	// note: multer adds "file" property to "req" object so next middlware can use it
	uploader.single('file'),
	require('./handler/create-file')
)

router.get('/', require('./handler/find-root-files-by-project-id'))

module.exports = router
