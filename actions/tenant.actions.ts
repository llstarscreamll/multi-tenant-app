import { Action } from '@ngrx/store';
import { Tenant } from './../models/tenant';
import { TenantPagination } from './../models/tenantPagination';
import { AppMessage } from './../../core/models/appMessage';

/**
 * Tenant Actions.
 *
 * @author  [name] <[<email address>]>
 */
export const GET_FORM_MODEL = '[Tenant] Get Form Model';
export const GET_FORM_MODEL_SUCCESS = '[Tenant] Get Form Model Success';
export const GET_FORM_DATA = '[Tenant] Get Form Data';
export const SET_SEARCH_QUERY = '[Tenant] Set Search Query';
export const PAGINATE = '[Tenant] Paginate';
export const PAGINATE_SUCCESS = '[Tenant] Paginate Success';
export const LIST = '[Tenant] List';
export const LIST_SUCCESS = '[Tenant] List Success';
export const CREATE = '[Tenant] Create';
export const GET_BY_ID = '[Tenant] Get';
export const UPDATE = '[Tenant] Update';
export const DELETE = '[Tenant] Delete';
export const RESTORE = '[Tenant] Restore';
export const SET_SELECTED = '[Tenant] Set Selected';
export const SET_MESSAGES = '[Tenant] Set Messages';

export class GetFormModelAction implements Action {
  readonly type = GET_FORM_MODEL;
  public constructor(public payload: null = null) { }
}

export class GetFormModelSuccessAction implements Action {
  readonly type = GET_FORM_MODEL_SUCCESS;
  public constructor(public payload: any[]) { }
}

export class GetFormDataAction implements Action {
  readonly type = GET_FORM_DATA;
  public constructor(public payload: boolean = false) { }
}

export class SetSearchQueryAction implements Action {
  readonly type = SET_SEARCH_QUERY;
  public constructor(public payload: Object = {}) { }
}

export class PaginateAction implements Action {
  readonly type = PAGINATE;
  public constructor(public payload: Object = {}) { }
}

export class PaginateSuccessAction implements Action {
  readonly type = PAGINATE_SUCCESS;
  public constructor(public payload: TenantPagination ) { }
}

export class ListAction implements Action {
  readonly type = LIST;
  public constructor(public payload: boolean = false) { }
}

export class ListSuccessAction implements Action {
  readonly type = LIST_SUCCESS;
  public constructor(public payload: Array<any> ) { }
}

export class GetByIdAction implements Action {
  readonly type = GET_BY_ID;
  public constructor(public payload: string) { }
}

export class CreateAction implements Action {
  readonly type = CREATE;
  public constructor(public payload: { item: Tenant, redirect: boolean }) { }
}

export class UpdateAction implements Action {
  readonly type = UPDATE;
  public constructor(public payload: { id: string | number, item: Tenant, redirect: boolean }) { }
}

export class DeleteAction implements Action {
  readonly type = DELETE;
  public constructor(public payload: { id: string, reloadListQuery: Object | null }) { }
}

export class RestoreAction implements Action {
  readonly type = RESTORE;
  public constructor(public payload: { id: string, reloadListQuery: Object | null }) { }
}

export class SetSelectedAction implements Action {
  readonly type = SET_SELECTED;
  public constructor(public payload: Tenant = null) { }
}

export class SetMessagesAction implements Action {
  readonly type = SET_MESSAGES;
  public constructor(public payload: AppMessage = null) { }
}

export type Actions
  = GetFormModelAction
  | GetFormModelSuccessAction
  | GetFormDataAction
  | SetSearchQueryAction
  | ListAction
  | ListSuccessAction
  | PaginateAction
  | PaginateSuccessAction
  | CreateAction
  | GetByIdAction
  | UpdateAction
  | DeleteAction
  | RestoreAction
  | SetSelectedAction
  | SetMessagesAction;
