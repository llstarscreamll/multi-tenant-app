import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import * as tenantActions from './../../actions/tenant.actions';
import * as fromRoot from './../../../reducers';
import * as appMessage from './../../../core/reducers/app-message.reducer';
import { FormModelParserService } from './../../../dynamic-form/services/form-model-parser.service';
import * as tenantReducer from './../../reducers/tenant.reducer';

import { Tenant } from './../../models/tenant';
import { TenantPagination } from './../../models/tenantPagination';
import { Pagination } from './../../../core/models/pagination';

import { TenantAbstractComponent, SearchQuery } from './tenant-abstract.component';

/**
 * TenantsTableComponent Class.
 *
 * @author  [name] <[<email address>]>
 */
@Component({
  selector: 'tenants-table-component',
  templateUrl: './tenants-table.component.html',
  exportAs: 'tenants-table',
})
export class TenantsTableComponent extends TenantAbstractComponent implements OnInit, OnDestroy {
  /**
   * Pagination info.
   */
  pagination: any;

  public constructor(
    protected store: Store<fromRoot.State>,
    protected translateService: TranslateService,
    protected formModelParserService: FormModelParserService,
  ) { super(); }

  public ngOnInit() {
    this.setupStoreSelects();
    this.onSearch();

    this.itemsListSubscription$ = this.itemsPagination$
      .subscribe((itemsList: TenantPagination) => {
        if (itemsList) {
          this.pagination = itemsList.pagination;
        }
      });
  }

  /**
   * Should a certain column be shown?.
   */
  public showColumn(column): boolean {
    return this.searchQuery.filter.indexOf(column) > -1;
  }

  /**
   * Update the search query with the new sortBy and sortedBy data.
   */
  public onSort(column: string) {
    let orderBy = column;
    let sortedBy = this.sortedBy == 'desc' || this.orderBy != column
      ? 'asc'
      : 'desc';

    this.store.dispatch(new tenantActions.SetSearchQueryAction({ 'orderBy': orderBy, 'sortedBy': sortedBy }));
  }

  /**
   * Update the search query with the new page data.
   */
  public pageChanged(data: {page: number,itemsPerPage: number}) {
    this.store.dispatch(new tenantActions.SetSearchQueryAction({page: data.page}));
  }

  get orderBy() {
    return this.searchQuery.orderBy;
  }

  get sortedBy() {
    return this.searchQuery.sortedBy;
  }

  get columns() {
    return this.searchQuery.filter;
  }

  get currentPage() {
    return this.pagination ? this.pagination.current_page : 1;
  }

  set currentPage(val) {
    val ? val : this.pagination.current_page;
  }

  /**
   * Clean the component canceling the background taks. This is called before the
   * component instance is funally destroyed.
   */
  public ngOnDestroy() {
    super.ngOnDestroy();
  }
}
