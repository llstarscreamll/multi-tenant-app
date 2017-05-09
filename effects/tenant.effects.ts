import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { go } from '@ngrx/router-store';
import 'rxjs/add/operator/withLatestFrom'

import * as fromRoot from './../../reducers';
import * as appMsgActions from './../../core/actions/app-message.actions';
import { FormModelParserService } from './../../dynamic-form/services/form-model-parser.service';
import { TenantPagination } from './../models/tenantPagination';
import { TenantService } from './../services/tenant.service';
import * as tenant from './../actions/tenant.actions';
import { Tenant } from './../models/tenant';
import { AppMessage } from './../../core/models/appMessage';
import { Effects } from './../../core/effects/abstract.effects';

@Injectable()
export class TenantEffects extends Effects {

	public constructor(
    private actions$: Actions,
    private tenantService: TenantService,
    private FormModelParserService: FormModelParserService,
    private store: Store<fromRoot.State>
  ) { super(); }

  protected setErrors(error: AppMessage): Action {
    return new tenant.SetErrorsAction(error.errors);
  }

  @Effect()
  loadTenants$: Observable<Action> = this.actions$
    .ofType(tenant.ActionTypes.LOAD_TENANTS)
    .map((action: Action) => action.payload)
    .switchMap((searchData) => {
      return this.tenantService.load(searchData)
        .map((data: TenantPagination) => { return new tenant.LoadSuccessAction(data)})
        .catch((error: AppMessage) => this.handleError(error));
    });

  @Effect()
  gettenantFormModel$: Observable<Action> = this.actions$
    .ofType(tenant.ActionTypes.GET_TENANT_FORM_MODEL)
    .withLatestFrom(this.store.select(fromRoot.getTenantState))
    .switchMap(([action, state]) => {
      // prevent API call if we have the form model already
      if (state.tenantFormModel !== null) {
        return of(new tenant.GetFormModelSuccessAction(state.tenantFormModel));
      }

      return this.tenantService.getTenantFormModel()
        .map((data) => this.FormModelParserService.parse(data, this.tenantService.fieldsLangNamespace))
        .map((data) => { return new tenant.GetFormModelSuccessAction(data)})
        .catch((error: AppMessage) => this.handleError(error));
    });

    @Effect()
    gettenantFormData$: Observable<Action> = this.actions$
      .ofType(tenant.ActionTypes.GET_TENANT_FORM_DATA)
      .withLatestFrom(this.store.select(fromRoot.getTenantState))
      .switchMap(([action, state]) => {
        // prevent API call if we have the form data already
        if (state.tenantFormData !== null) {
          return of(new tenant.GetFormDataSuccessAction(state.tenantFormData));
        }

        return this.tenantService.getTenantFormData()
          .map((data) => { return new tenant.GetFormDataSuccessAction(data)})
          .catch((error: AppMessage) => this.handleError(error));
      });

    @Effect()
    get$: Observable<Action> = this.actions$
      .ofType(tenant.ActionTypes.GET_TENANT)
      .withLatestFrom(this.store.select(fromRoot.getTenantState))
      .switchMap(([action, state]) => {
        // prevent API call if we have the data object already
        if (state.selectedTenant && action.payload == state.selectedTenant.id) {
          return of(new tenant.SetSelectedAction(state.selectedTenant));
        }

        return this.tenantService.getTenant(action.payload)
          .mergeMap((data: Tenant) => {
            return [
              new tenant.SetSelectedAction(data),
            ];
          })
          .catch((error: AppMessage) => this.handleError(error));
      });

    @Effect()
    create$: Observable<Action> = this.actions$
      .ofType(tenant.ActionTypes.CREATE_TENANT)
      .map((action: Action) => action.payload)
      .switchMap((data) => {
        return this.tenantService.create(data)
          .mergeMap((data: Tenant) => {
            return [
              new tenant.SetSelectedAction(data),
              new appMsgActions.Flash(this.tenantService.getSuccessMessage('create')),
              go(['tenant', data.id, 'details'])
            ];
          })
          .catch((error: AppMessage) => this.handleError(error));
      });

    @Effect()
    createByName$: Observable<Action> = this.actions$
      .ofType(tenant.ActionTypes.CREATE_TENANT_BY_NAME)
      .map((action: Action) => action.payload)
      .switchMap((data) => {
        return this.tenantService.createByName(data)
          .mergeMap((data: Tenant) => {
            return [
              new tenant.SetSelectedAction(data),
              new appMsgActions.Flash(this.tenantService.getSuccessMessage('create')),
              new tenant.LoadAction(),
              // go(['tenant', data.id, 'details']), // don't redirect
            ];
          })
          .catch((error: AppMessage) => this.handleError(error));
      });

    @Effect()
    update$: Observable<Action> = this.actions$
      .ofType(tenant.ActionTypes.UPDATE_TENANT)
      .map((action: Action) => action.payload)
      .switchMap((data: Tenant) => {
        return this.tenantService.update(data)
          .mergeMap((data: Tenant) => {
            return [
              new tenant.SetSelectedAction(data),
              new appMsgActions.Flash(this.tenantService.getSuccessMessage('update')),
              go(['tenant', data.id, 'details'])
            ];
          })
          .catch((error: AppMessage) => this.handleError(error));
      });

    @Effect()
    delete$: Observable<Action> = this.actions$
      .ofType(tenant.ActionTypes.DELETE_TENANT)
      .map((action: Action) => action.payload)
      .switchMap(action => {
        return this.tenantService.delete(action.id)
          .mergeMap(() => {
            let actions = [
              new appMsgActions.Flash(this.tenantService.getSuccessMessage('delete')),
              go(['tenant'])
            ];

            if(action.reloadListQuery) {
              actions.push(new tenant.LoadAction(action.reloadListQuery));
            }

            return actions;
          })
          .catch((error: AppMessage) => this.handleError(error));
      });
}
