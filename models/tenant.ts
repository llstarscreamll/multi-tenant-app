import { Timestamps } from './../../core/models/date';

export class Tenant {
	id: string;
	name: string;
	driver: string;
	host: string;
	port: string;
	database: string;
	username: string;
	password: string;
	prefix: string;
	meta: string[];
	created_at: string;
	updated_at: string;
	deleted_at: string;
}
