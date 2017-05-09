import * as tenant from '../actions/tenant.actions';
import { Tenant } from './../models/tenant';
import { TenantPagination } from './../models/tenantPagination';

export interface State {
  tenantFormModel: Object;
  tenantFormData: Object;
  tenantsPagination: TenantPagination | null;
  selectedTenant: Tenant | null;
  loading: boolean;
  errors: Object;
}

const initialState: State = {
  tenantFormModel: null,
  tenantFormData: null,
  tenantsPagination: null,
  selectedTenant: null,
  loading: true,
  errors: {}
};

export function reducer(state = initialState, action: tenant.Actions): State {
  switch (action.type) {
    case tenant.ActionTypes.LOAD_TENANTS: {
      return { ...state, loading: true };
    }

    case tenant.ActionTypes.LOAD_TENANTS_SUCCESS: {
      return { ...state, tenantsPagination: action.payload as TenantPagination, loading: false };
    }
    
    case tenant.ActionTypes.GET_TENANT_FORM_MODEL: {
      return { ...state, loading: true };
    }

    case tenant.ActionTypes.GET_TENANT_FORM_MODEL_SUCCESS: {
      return { ...state, tenantFormModel: action.payload, loading: false };
    }
    
    case tenant.ActionTypes.GET_TENANT_FORM_DATA: {
      return { ...state, loading: true };
    }

    case tenant.ActionTypes.GET_TENANT_FORM_DATA_SUCCESS: {
      return { ...state, tenantFormData: action.payload, loading: false };
    }

    case tenant.ActionTypes.CREATE_TENANT: {
      return { ...state, loading: true };
    }

    case tenant.ActionTypes.CREATE_TENANT_BY_NAME: {
      return { ...state, loading: true };
    }

    case tenant.ActionTypes.GET_TENANT: {
      return { ...state, loading: true };
    }

    case tenant.ActionTypes.UPDATE_TENANT: {
      return { ...state, loading: true };
    }

    case tenant.ActionTypes.DELETE_TENANT: {
      return { ...state, loading: true };
    }

    case tenant.ActionTypes.RESTORE_TENANT: {
      return { ...state, loading: true };
    }

    case tenant.ActionTypes.SET_SELECTED_TENANT: {
      return { ...state, selectedTenant: action.payload as Tenant, loading: false };
    }

    case tenant.ActionTypes.SET_TENANT_ERRORS: {
      return { ...state, errors: action.payload };
    }

    default: {
      return state;
    }
  }
 }

export const getTenantFormModel = (state: State) => state.tenantFormModel;
export const getTenantFormData = (state: State) => state.tenantFormData;
export const getTenantsPagination = (state: State) => state.tenantsPagination;
export const getSelectedTenant = (state: State) => state.selectedTenant;
export const getLoading = (state: State) => state.loading;
export const getErrors = (state: State) => state.errors;

/* -----------------------------------------------------------------------------
Don't forget to import these reducer on the main app reducer!!

import * as fromTenant from './tenant/reducers/tenant.reducer';

export interface State {
  tenant: fromTenant.State;
}

const reducers = {
  tenant: fromTenant.reducer,
};

  
// Tenant selectors
export const getTenantState = (state: State) => state.tenant;
export const getTenantFormModel = createSelector(getTenantState, fromTenant.getTenantFormModel);
export const getTenantFormData = createSelector(getTenantState, fromTenant.getTenantFormData);
export const getTenantsPagination = createSelector(getTenantState, fromTenant.getTenantsPagination);
export const getSelectedTenant = createSelector(getTenantState, fromTenant.getSelectedTenant);
export const getTenantLoading = createSelector(getTenantState, fromTenant.getLoading);
export const getTenantErrors = createSelector(getTenantState, fromTenant.getErrors);

----------------------------------------------------------------------------- */
