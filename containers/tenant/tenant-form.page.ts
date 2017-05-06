import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormModelParserService } from './../../../dynamic-form/services/form-model-parser.service';
import * as appMessage from './../../../core/reducers/app-message.reducer';
import * as fromRoot from './../../../reducers';
import * as tenantReducer from './../../reducers/tenant.reducer';
import * as tenantActions from './../../actions/tenant.actions';
import { Tenant } from './../../models/tenant';
import { TenantAbstractPage } from './tenant-abstract.page';

@Component({
  selector: 'tenant-form-page',
  templateUrl: './tenant-form.page.html',
  styleUrls: ['./tenant-form.page.css']
})
export class TenantFormPage extends TenantAbstractPage implements OnInit, OnDestroy {  
  protected title: string = 'form-page';
  public formType: string = 'create';
  public tenantForm: FormGroup;
  public formConfigured: boolean = false;

  public constructor(
    protected store: Store<fromRoot.State>,
    protected titleService: Title,
    protected translateService: TranslateService,
    protected formModelParserService: FormModelParserService,
    protected location: Location,
    protected activedRoute: ActivatedRoute,
  ) { super(); }

  public ngOnInit() {
    this.setDocumentTitle();
    this.setupStoreSelects();
    this.initForm();
    this.setupForm();
  }

  private setupForm() {
    this.formModelSubscription$ = this.tenantFormModel$
      .subscribe((model) => {
        if (model) {
          this.tenantForm = this.formModelParserService.toFormGroup(model);

          if (this.formType == 'details' || this.formType == 'edit') {
            this.patchForm();
          } else {
            this.formConfigured = true;
          }
        }
      });
  }

  private patchForm() {
    this.selectedTenant$.subscribe((tenant) => {
      if (tenant != null && tenant.id && tenant.id.includes(this.id)) {
        this.tenantForm.patchValue(tenant);
        this.formConfigured = true;
      }
    });
  }

  public submitTenantForm() {
    if (this.formType == 'create')
      this.store.dispatch(new tenantActions.CreateAction(this.tenantForm.value));

    if (this.formType == 'edit')
      this.store.dispatch(new tenantActions.UpdateAction(this.tenantForm.value));

    if (this.formType == 'details')
      this.store.dispatch(go(['tenant', this.id, 'edit']));
  }

  public ngOnDestroy() {
    this.formModelSubscription$.unsubscribe();
    this.activedRouteSubscription$ ? this.activedRouteSubscription$.unsubscribe() : null;
  }
}
