import { Pagination } from './../../core/models/pagination';
import { Tenant } from './tenant';

export class TenantPagination {
	public data: Tenant[];
	public pagination: { pagination: Pagination };
}
