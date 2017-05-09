import { Action } from '@ngrx/store';
import { type } from './../../core/util';
import { Tenant } from './../models/tenant';
import { TenantPagination } from './../models/tenantPagination';

export const ActionTypes = {
	LOAD_TENANTS: type('[Tenant] Load'),
	LOAD_TENANTS_SUCCESS: type('[Tenant] Load Success'),
	GET_TENANT_FORM_DATA: type('[Tenant] Get Form Data'),
	GET_TENANT_FORM_DATA_SUCCESS: type('[Tenant] Get Form Data Success'),
	GET_TENANT_FORM_MODEL: type('[Tenant] Get Form Model'),
	GET_TENANT_FORM_MODEL_SUCCESS: type('[Tenant] Get Form Model Success'),
	CREATE_TENANT: type('[Tenant] Create'),
	CREATE_TENANT_BY_NAME: type('[Tenant] Create by Name'),
	GET_TENANT: type('[Tenant] Get'),
	UPDATE_TENANT: type('[Tenant] Update'),
	DELETE_TENANT: type('[Tenant] Delete'),
	RESTORE_TENANT: type('[Tenant] Restore'),
	SET_SELECTED_TENANT: type('[Tenant] Set Selected'),
	SET_TENANT_ERRORS: type('[Tenant] Set Errors'),
}

export class LoadAction implements Action {
	type = ActionTypes.LOAD_TENANTS;
	public constructor(public payload: Object = {}) { }
}

export class LoadSuccessAction implements Action {
	type = ActionTypes.LOAD_TENANTS_SUCCESS;
	public constructor(public payload: TenantPagination ) { }
}

export class GetFormModelAction implements Action {
	type = ActionTypes.GET_TENANT_FORM_MODEL;
	public constructor(public payload: null = null) { }
}

export class GetFormModelSuccessAction implements Action {
	type = ActionTypes.GET_TENANT_FORM_MODEL_SUCCESS;
	public constructor(public payload: Object) { }
}

export class GetFormDataAction implements Action {
	type = ActionTypes.GET_TENANT_FORM_DATA;
	public constructor(public payload: null = null) { }
}

export class GetFormDataSuccessAction implements Action {
	type = ActionTypes.GET_TENANT_FORM_DATA_SUCCESS;
	public constructor(public payload: Object) { }
}

export class GetAction implements Action {
	type = ActionTypes.GET_TENANT;
	public constructor(public payload: string) { }
}

export class CreateAction implements Action {
	type = ActionTypes.CREATE_TENANT;
	public constructor(public payload: Object) { }
}


export class CreateByNameAction implements Action {
	type = ActionTypes.CREATE_TENANT_BY_NAME;
	public constructor(public payload: Object) { }
}

export class UpdateAction implements Action {
	type = ActionTypes.UPDATE_TENANT;
	public constructor(public payload: Tenant) { }
}

export class DeleteAction implements Action {
	type = ActionTypes.DELETE_TENANT;
	public constructor(public payload: { id: string, reloadListQuery: Object }) { }
}

export class RestoreAction implements Action {
	type = ActionTypes.RESTORE_TENANT;
	public constructor(public payload: string) { }
}

export class SetSelectedAction implements Action {
	type = ActionTypes.SET_SELECTED_TENANT;
	public constructor(public payload: Tenant | Object = null) { }
}

export class SetErrorsAction implements Action {
	type = ActionTypes.SET_TENANT_ERRORS;
	public constructor(public payload: Tenant | Object = {}) { }
}

export type Actions
	= LoadAction
	| LoadSuccessAction
	| GetFormModelAction
	| GetFormModelSuccessAction
	| GetFormDataAction
	| GetFormDataSuccessAction
	| CreateAction
	| GetAction
	| UpdateAction
	| DeleteAction
	| RestoreAction
	| SetSelectedAction
	| SetErrorsAction;
