'use strict'

// while it doesn't do much for now it's important to have it incapsulated in
// this one function, it does subtle, but important logic like setting a default
// parentId or size
const createMetadata = ({
	parentId,
	projectId,
	name,
	size,
	type,
}) => ({
	parentId: parentId || 'root',
	projectId: projectId,
	name: name,
	size: type === 'FOLDER' ? 0 : size, // initially all created folders are empty
	type: type,
})

module.exports = createMetadata
