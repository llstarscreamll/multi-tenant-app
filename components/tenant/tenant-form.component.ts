import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { go } from '@ngrx/router-store';

import { FormModelParserService } from './../../../dynamic-form/services/form-model-parser.service';
import * as appMessage from './../../../core/reducers/app-message.reducer';
import * as fromRoot from './../../../reducers';
import * as tenantReducer from './../../reducers/tenant.reducer';
import * as tenantActions from './../../actions/tenant.actions';
import { Tenant } from './../../models/tenant';
import { TenantAbstractComponent } from './tenant-abstract.component';

/**
 * TenantFormComponent Class.
 *
 * @author  [name] <[<email address>]>
 */
@Component({
  selector: 'tenant-form-component',
  templateUrl: './tenant-form.component.html',
  exportAs: 'tenant-form',
})
export class TenantFormComponent extends TenantAbstractComponent implements OnInit, OnDestroy {
  /**
   * Tenants form group.
   * @type  FormGroup
   */
  public form: FormGroup;

  /**
   * Form type to render (create|update|details). Because some fields could not
   * be shown based on the form type.
   * @type  string
   */
  @Input()
  public formType: string = 'create';

  @Input()
  public selectedItemId: string;

  /**
   * Call redirect action from ngrx/router-store in create/update effects?
   */
  @Input()
  public redirect: boolean = true;

  /**
   * TenantFormComponent constructor.
   */
  public constructor(
    protected store: Store<fromRoot.State>,
    protected activedRoute: ActivatedRoute,
    protected translateService: TranslateService,
    protected formModelParserService: FormModelParserService,
  ) { super(); }

  /**
   * The component is ready, this is called after the constructor and after the
   * first ngOnChanges(). This is invoked only once when the component is
   * instantiated.
   */
  public ngOnInit() {
    this.setupStoreSelects();
    // if form type is details|update, then download the Tenant data from API by the given id
    this.loadSelectedItem();
    this.initForm();
    this.setupFormData();
    this.setupFormModel();
  }

  /**
   * It's all the form stuff ready to be shown?
   */
  get ready(): boolean {
    if (this.form && this.formReady && this.formModelReady && this.formDataReady && this.selectedItemReady) {
      return true;
    }
    
    return false;
  }

  /**
   * Parse the form model to form group.
   */
  private setupFormModel() {
    this.formModelSubscription$ = this.formModel$
      .subscribe((model) => {
        if (model) {
          this.form = this.formModelParserService.toFormGroup(model, this.formType);
          this.patchForm();
          this.formModelReady = true;
        }
      });
  }

  /**
   * Patch the form group values with the selected item data.
   */
  private patchForm() {
    if (this.formType == 'details' || this.formType == 'edit') {
      this.selectedItemSubscription$ = this.selectedItem$
        .subscribe((tenant) => {
          if (tenant != null && tenant.id && tenant.id.includes(this.selectedItemId)) {
            this.form.patchValue(tenant);
            this.formReady = true;
            this.selectedItemReady = true;
          }
        });
      } else {
        this.formReady = true;
        this.selectedItemReady = true;
      }
  }

  /**
   * Hadle the form submition based on the actual form type.
   */
  public submitForm() {
    let payload = { item: this.form.value, redirect: this.redirect };

    if (this.formType == 'create') {
      this.store.dispatch(new tenantActions.CreateAction(payload));
    }

    if (this.formType == 'edit') {
      this.store.dispatch(new tenantActions.UpdateAction({ ...payload, id: this.selectedItemId }));
    }

    if (this.formType == 'details') {
      this.store.dispatch(go(['tenant', this.selectedItemId, 'edit']));
      return;
    }

    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  /**
   * Clean the component canceling the background taks. This is called before the
   * component instance is funally destroyed.
   */
  public ngOnDestroy() {
    super.ngOnDestroy();
  }
}
