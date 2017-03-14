'use strict'

const model = require('../mongo/model')

module.exports = (folderId, newSize) => {
	return model
		.findOneAndUpdate({ _id: folderId }, { $set: {	size: newSize	} })
		.lean()
		.exec()
}
