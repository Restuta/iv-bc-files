'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	dateModified: {
		type: Date,
		default: Date.now,
	},
	name: {
		required: true,
		type: String,
	},
	parentId: {
		type: String,
		required: true,
	},
	projectId: {
		type: String,
		required: true,
	},
	size: {
		type: Number,
		required: true,
	},
	// for simplicity we treat folders as files, hence type could be file|folder
	type: {
		type: String,
		required: true,
		uppercase: true,
		enum: ['FILE', 'FOLDER'],
	},
})

module.exports = mongoose.model('File', schema)
