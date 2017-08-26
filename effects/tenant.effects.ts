import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { go } from '@ngrx/router-store';
import { empty } from 'rxjs/observable/empty';
import 'rxjs/add/operator/withLatestFrom';

import * as fromRoot from './../../reducers';
import * as tenant from './../actions/tenant.actions';
import { Tenant } from './../models/tenant';
import { TenantPagination } from './../models/tenantPagination';
import { AppMessage } from './../../core/models/appMessage';
import { FormModelParserService } from './../../dynamic-form/services/form-model-parser.service';
import { TenantService } from './../services/tenant.service';

import { Effects } from './../../core/effects/abstract.effects';

/**
 * TenantEffects Class.
 *
 * @author  [name] <[<email address>]>
 */
@Injectable()
export class TenantEffects extends Effects {

  @Effect()
  getFormModel$: Observable<Action> = this.actions$
    .ofType(tenant.GET_FORM_MODEL)
    .withLatestFrom(this.store.select(fromRoot.getTenantState))
    .switchMap(([action, state]) => {
      // prevent API call if we have the form model already
      if (state.formModel !== null) {
        return of(new tenant.GetFormModelSuccessAction(state.formModel));
      }

      return this.tenantService.getFormModel()
        .map((data) => this.FormModelParserService.parse(data, this.tenantService.fieldsLangKey))
        .map((data) => { return new tenant.GetFormModelSuccessAction(data)})
        .catch((error: AppMessage) => this.handleError(error));
    });

  @Effect()
  getFormData$: Observable<Action> = this.actions$
    .ofType(tenant.GET_FORM_DATA)
    .map((action: Action) => action.payload)
    .mergeMap((force: boolean) => {
      return [
      ];
    });

  @Effect()
  setSearchQuery$: Observable<Action> = this.actions$
    .ofType(tenant.SET_SEARCH_QUERY)
    .map((action: Action) => action.payload)
    .map((searchQuery) => new tenant.PaginateAction());

  @Effect()
  paginate$: Observable<Action> = this.actions$
    .ofType(tenant.PAGINATE)
    .withLatestFrom(this.store.select(fromRoot.getTenantState))
    .switchMap(([action, state]) => {
      return this.tenantService.paginate(state.searchQuery)
        .map((data: TenantPagination) => { return new tenant.PaginateSuccessAction(data)})
        .catch((error: AppMessage) => this.handleError(error));
    });

  @Effect()
  list$: Observable<Action> = this.actions$
    .ofType(tenant.LIST)
    .withLatestFrom(this.store.select(fromRoot.getTenantState))
    .switchMap(([action, state]) => {
      // data already exists and force == false?
      if (state.list && !action.payload) {
        return empty();
      }

      return this.tenantService.list()
        .map((data) => { return new tenant.ListSuccessAction(data)})
        .catch((error: AppMessage) => this.handleError(error));
    });

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(tenant.CREATE)
    .map((action: Action) => action.payload)
    .switchMap((payload: { item: Tenant, redirect: boolean}) => {
      const actions: Array<Action> = [];

      return this.tenantService.create(payload.item)
        .mergeMap((createdItem: Tenant) => {
          actions.push(
            // this will refresh the list if anybody needs it later
            new tenant.ListSuccessAction(null),
            new tenant.SetSelectedAction(createdItem),
            new tenant.SetMessagesAction(this.tenantService.getMessage('create_success'))
          );

          if (payload.redirect === true) {
            actions.push(go(['tenant', createdItem.id, 'details']));
          }

          return actions;
        })
        .catch((error: AppMessage) => this.handleError(error));
    });

  @Effect()
  getById$: Observable<Action> = this.actions$
    .ofType(tenant.GET_BY_ID)
    .withLatestFrom(this.store.select(fromRoot.getTenantState))
    .switchMap(([action, state]) => {
      // prevent API call if we have the selected item object in the store already
      if (state.selected && action.payload == state.selected.id) {
        return of(new tenant.SetSelectedAction(state.selected));
      }

      return this.tenantService.getById(action.payload)
        .mergeMap((item: Tenant) => {
          return [
            new tenant.SetSelectedAction(item),
          ];
        })
        .catch((error: AppMessage) => this.handleError(error));
    });

  @Effect()
  setSelectedItem$: Observable<Action> = this.actions$
    .ofType(tenant.SET_SELECTED)
    .map((action: Action) => action.payload)
    .switchMap((item: Tenant) => {
      // if the selected item is trashed, then flash a msg to notify the user
      if (item && item.deleted_at) {
        const msg = this.tenantService.getMessage('item_trashed', 'warning');
        return of(new tenant.SetMessagesAction(msg));
      }

      return empty();
    });

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(tenant.UPDATE)
    .map((action: Action) => action.payload)
    .switchMap((payload: { id: string | number, item: Tenant, redirect: boolean}) => {
      const actions: Array<Action> = [];

      return this.tenantService.update(payload.id, payload.item)
        .mergeMap((updatedItem: Tenant) => {
          actions.push(
            // this will refresh the list if anybody needs it later
            new tenant.ListSuccessAction(null),
            new tenant.SetSelectedAction(updatedItem),
            new tenant.SetMessagesAction(this.tenantService.getMessage('update_success'))
          );

          // make redirection to details page if desired
          if (payload.redirect === true) {
            actions.push(go(['tenant', updatedItem.id, 'details']));
          }

          return actions;
        })
        .catch((error: AppMessage) => this.handleError(error));
    });

  @Effect()
  delete$: Observable<Action> = this.actions$
    .ofType(tenant.DELETE)
    .map((action: Action) => action.payload)
    .switchMap(action => {
      return this.tenantService.delete(action.id)
        .mergeMap(() => {
          const actions = [
            // this will refresh the list if anybody needs it later
            new tenant.ListSuccessAction(null),
            new tenant.SetMessagesAction(this.tenantService.getMessage('delete_success')),
            go(['tenant'])
          ];

          if (action.reloadListQuery) {
            actions.push(new tenant.PaginateAction(action.reloadListQuery));
          }

          return actions;
        })
        .catch((error: AppMessage) => this.handleError(error));
    });

  /**
   * TenantEffects contructor.
   */
  public constructor(
    private actions$: Actions,
    private tenantService: TenantService,
    private FormModelParserService: FormModelParserService,
    private store: Store<fromRoot.State>
  ) { super(); }

  protected setMessages(message: AppMessage): Action {
    return new tenant.SetMessagesAction(message);
  }

}
