import { Timestamps } from './../../core/models/date';

interface Module {
	id: string | number;
	name: string;
}

export class Tenant {
	id: string;
	name: string;
	driver: string;
	host: string;
	port: string;
	database: string;
	username: string;
	password?: string;
	prefix: string;
	meta: string[];
	modules?: {data: Array<Module>};
	created_at: string;
	updated_at: string;
	deleted_at: string;
}
