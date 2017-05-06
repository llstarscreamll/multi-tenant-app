import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Tenant } from './../../models/tenant';
import { Pagination } from './../../../core/models/pagination';

@Component({
  selector: 'tenants-table-component',
  templateUrl: './tenants-table.component.html',
  styleUrls: ['./tenants-table.component.css']
})
export class TenantsTableComponent implements OnInit {
	@Input()
  columns = [];

	@Input()
  tenants: Tenant[] = [];

  @Input()
  public sortedBy: string = '';

  @Input()
  public orderBy: string = '';

  @Input()
  public pagination: Pagination;

  @Output()
  public updateSearch = new EventEmitter<Object>();
  
  @Output()
  public deleteBtnClicked = new EventEmitter<string>();
  
  public translateKey: string = 'TENANT.';

  get currentPage() {
    return this.pagination ? this.pagination.current_page : 1;
  }

  set currentPage(val) {
    val ? val : this.pagination.current_page;
  }

  public constructor() { }

  public ngOnInit() { }

  public showColumn(column): boolean {
    return this.columns.indexOf(column) > -1;
  }
}
