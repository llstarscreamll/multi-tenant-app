import { Pagination } from './../../core/models/pagination';
import { Tenant } from './tenant';

/**
 * TenantPagination Class.
 *
 * @author  [name] <[<email address>]>
 */
export class TenantPagination {
	public data: Tenant[];
	public pagination: Pagination;
}
