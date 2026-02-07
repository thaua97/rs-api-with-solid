import { register } from './controllers/register';
import type { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
	// Register User
	app.post('/users', register);
}
