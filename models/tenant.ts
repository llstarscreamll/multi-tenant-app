/**
 * Tenant Class.
 *
 * @author  [name] <[<email address>]>
 */
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
	meta: string[] | string;
	created_at: string;
	updated_at: string;
	deleted_at: string;
}
