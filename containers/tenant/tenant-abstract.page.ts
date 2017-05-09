import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';

import { FormModelParserService } from './../../../dynamic-form/services/form-model-parser.service';
import * as appMessage from './../../../core/reducers/app-message.reducer';
import * as fromRoot from './../../../reducers';

import * as tenantActions from './../../actions/tenant.actions';
import { Tenant } from './../../models/tenant';
import { TenantPagination } from './../../models/tenantPagination';

export interface SearchQuery {
  filter: string[];
  include: {};
  orderBy: string;
  sortedBy: string;
  page: number;
}

export abstract class TenantAbstractPage {
  protected abstract store: Store<fromRoot.State>;
  protected abstract titleService: Title;
  protected abstract translateService: TranslateService;
  protected abstract formModelParserService: FormModelParserService;
  protected location: Location;
  protected activedRoute: ActivatedRoute;
  
  public tenantFormModel$: Observable<Object>;
  public tenantFormData$: Observable<Object>;
  public tenantsPagination$: Observable<TenantPagination>;
  public selectedTenant$: Observable<Tenant | null>;
  public loading$: Observable<boolean>;
  public errors$: Observable<Object>;
  public appMessages$: Observable<appMessage.State>;

  protected formModelSubscription$: Subscription;
  protected activedRouteSubscription$: Subscription;
  public formConfigured: boolean = false;

  protected abstract title: string;
  protected deleteAlertOptions: any;

  public translateKey: string = 'TENANT.';
  public searchQuery: SearchQuery = null;
  public formType: string = 'search';
  public id: string = null;
  public tableColumns = [
      'tenants.id',
      'tenants.name',
      'tenants.driver',
      'tenants.host',
      'tenants.port',
      'tenants.database',
      'tenants.username',
      'tenants.password',
      'tenants.prefix',
      'tenants.meta',
      'tenants.created_at',
      'tenants.updated_at',
      'tenants.deleted_at',
  ];

  public constructor() { }

  public setupStoreSelects() {
    this.tenantFormModel$ = this.store.select(fromRoot.getTenantFormModel);
    this.tenantFormData$ = this.store.select(fromRoot.getTenantFormData);
    this.tenantsPagination$ = this.store.select(fromRoot.getTenantsPagination);
    this.selectedTenant$ = this.store.select(fromRoot.getSelectedTenant);
    this.loading$ = this.store.select(fromRoot.getTenantLoading);
    this.errors$ = this.store.select(fromRoot.getTenantErrors);
    this.appMessages$ = this.store.select(fromRoot.getAppMessagesState);
  }

  protected setDocumentTitle() {
    this.translateService
      .get(this.translateKey + this.title)
      .subscribe(val => this.titleService.setTitle(val));
  }

  public initForm() {
    this.setFormType();

    // if form type is details|update, then download the Tenant data from API by the given id
    this.loadTenant();
    
    this.store.dispatch(new tenantActions.GetFormDataAction(null));
    this.store.dispatch(new tenantActions.GetFormModelAction(null));
  }

  protected setFormType() {
    let url: string = this.location.path();
    
    if (url.search(/tenant\/+[a-z0-9]+\/details+$/i) > -1)
      this.formType = "details";
    
    if (url.search(/tenant\/+[a-z0-9]+\/edit+$/i) > -1)
      this.formType = "edit";
    
    if (url.search(/tenant\/create$/i) > -1)
      this.formType = "create";
  }

  private loadTenant() {
    if (this.formType.includes('details') || this.formType.includes('edit')) {
      this.activedRouteSubscription$ = this.activedRoute.params.subscribe(params => {
        this.id = params['id'];
        this.store.dispatch(new tenantActions.GetAction(this.id));
      });
    }
  }

  public deleteRow(id: string) {
    this.translateService
      .get(this.translateKey + 'delete-alert')
      .subscribe(val => this.deleteAlertOptions = val);

    swal({
      title: this.deleteAlertOptions.title,
      text: this.deleteAlertOptions.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: this.deleteAlertOptions.confirm_btn_text,
      cancelButtonText: this.deleteAlertOptions.cancel_btn_text,
      confirmButtonColor: '#ed5565',
      target: 'app-page-content'
    }).then(() => {
      this.store.dispatch(new tenantActions.DeleteAction({ id: id, reloadListQuery: this.searchQuery }));
    }).catch(swal.noop);
  }
}
