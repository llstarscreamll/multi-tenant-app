import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { isEmpty } from 'lodash';

import * as fromRoot from './../../../reducers';
import * as appMessage from './../../../core/reducers/app-message.reducer';
import { FormModelParserService } from './../../../dynamic-form/services/form-model-parser.service';
import * as tenantReducer from './../../reducers/tenant.reducer';
import * as tenantActions from './../../actions/tenant.actions';
import { Tenant } from './../../models/tenant';
import { TenantAbstractPage, SearchQuery } from './tenant-abstract.page';

@Component({
  selector: 'list-and-search-tenants-page',
  templateUrl: './list-and-search-tenants.page.html',
  styleUrls: ['./list-and-search-tenants.page.css']
})
export class ListAndSearchTenantsPage extends TenantAbstractPage implements OnInit {
  protected title: string = 'module-name-plural';
  public formType: string = 'search';
  public showSearchOptions: boolean = false;
  public formConfigured: boolean = false;
  public advancedSearchFormModel: Object;
  public tenantForm: FormGroup;
  public advancedSearchForm: FormGroup;

  /**
   * The search query options.
   */
  public searchQuery: SearchQuery = {
    // columns to retrive from API
    filter: [
      'tenants.name',
    ],
    // the relations map, we need some fields for eager load certain relations
    include: {
    },
    orderBy: "tenants.created_at",
    sortedBy: "desc",
    page: 1
  };

  public constructor(
    protected store: Store<fromRoot.State>,
    protected location: Location,
    protected titleService: Title,
    protected translateService: TranslateService,
    protected formModelParserService: FormModelParserService
  ) { super(); }

  public ngOnInit() {
    this.setDocumentTitle();
    this.setupStoreSelects();
    this.initForm();
    this.setupForm();
  	this.onSearch();
  }

  private setupForm() {
    this.formModelSubscription$ = this.tenantFormModel$
      .subscribe((model) => {
        if (model) {
          this.tenantForm = this.formModelParserService.toFormGroup(model);
          this.setupAdvancedSearchForm(model);
          this.formConfigured = true;
        }
      });
  }

  public setupAdvancedSearchForm(model: Object) {
    this.advancedSearchFormModel = this.formModelParserService.parseToSearch(model, this.tableColumns, this.translateKey);
    this.advancedSearchForm = this.formModelParserService.toFormGroup(this.advancedSearchFormModel);
    this.advancedSearchForm.get('options').patchValue(this.searchQuery);
    this.advancedSearchForm.get('search').patchValue(this.searchQuery);
  }

  public onSearch(data: Object = {}) {
    this.searchQuery = Object.assign({}, this.searchQuery, data, { advanced_search: false });
    this.store.dispatch(new tenantActions.LoadAction(this.searchQuery));
  }

  public onAdvancedSearch() {
    let options = {};

    if (!this.advancedSearchForm.get('search').pristine) {
      Object.assign(options, this.advancedSearchForm.get('search').value, { advanced_search: true, page: 1 });
    }

    if (!this.advancedSearchForm.get('options').pristine) {
      Object.assign(options, this.advancedSearchForm.get('options').value);
    }

    if (!isEmpty(options)) {
      this.searchQuery = Object.assign({}, this.searchQuery, options);
      this.store.dispatch(new tenantActions.LoadAction(this.searchQuery));
    }
  }
}
