'use strict'

const createOne = require('../command/create-one')
const findById = require('../query/find-by-id')
const createMetadata = require('./create-file-metadata')
const updateFolderSize = require('../command/update-folder-size')

/*
	Keep folder size in sync with file-sizes
	to do that whenever file is uploaded we would need to append it's size to a folder size
	so logic is the following:
	if parent is a folder, get file size and update parent as well
	I think it makes sense to put this inside a Handler here since commands and queries are supposed
	to be very simpleobject responsible for only one thing

	also this kind has to be transactional operation and in Mongo updates to one collection
	are transactional, so we are cool, but current code structure doesn't account for that,
	so I am keeping it as-is for now

	second issue is that we are returning object as plain JSON from queries, so update can't benefit
	from pre-loaded object, but again for now I will just fetch it one more time

	third issue is recursive updates, I didn't cover this case yet, potentially this is a
	really good candidate to do this transactionally

	also on the client we do optimistic updates, it's kind of an overkill for now to also
	do this for folder sizes, but otherwise we would have to return a sub-tree from the
	server to update on the client. I'd go down this path since will be doing recursive
	updates anyway.

	Another option is to just calculate size on the client for folders and don't pre-calculate it.

	*/

const createFile = req => {
	const fileSize = req.file.size

	const fileMetadata = createMetadata({
		parentId: req.query.parentId,
		projectId: req.query.projectId,
		name: req.file.originalname,
		size: fileSize,
		type: 'FILE',
	})

	if (fileMetadata.parentId === 'root') {
		return createOne(fileMetadata)
	}

	return findById(fileMetadata.parentId)
		.then(parent => {
			if (parent.type === 'FOLDER') {
				const newSize = parent.size + fileSize

				return updateFolderSize(parent._id, newSize)
					.then(() => createOne(fileMetadata))
			}

			return createOne(fileMetadata)
		})
}

module.exports = (req, res, next) => {
	createFile(req)
		.then(createdFile => findById(createdFile._id))
		.then(file => res.json(file))
		.catch(next)
}
