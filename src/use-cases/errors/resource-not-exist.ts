export class ResourceNotExistError extends Error {
	constructor() {
		super('Resource not exist');
	}
}