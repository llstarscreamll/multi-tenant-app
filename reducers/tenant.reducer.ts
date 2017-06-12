import * as tenant from '../actions/tenant.actions';
import { Tenant } from './../models/tenant';
import { TenantPagination } from './../models/tenantPagination';

import { AppMessage } from './../../core/models/appMessage';
import { SearchQuery } from './../components/tenant/tenant-abstract.component';

/**
 * Tenant Reducer.
 *
 * @author  [name] <[<email address>]>
 */
export interface State {
  formModel: Object;
  list: Array<any>;
  pagination: TenantPagination | null;
  selected: Tenant | null;
  searchQuery: SearchQuery;
  loading: boolean;
  messages: AppMessage;
}

const initialState: State = {
  formModel: null,
  pagination: null,
  list: null,
  selected: null,
  searchQuery: {
    // columns to retrive from API
    filter: [
      // 'tenants.id',
      'tenants.name',
      // 'tenants.driver',
      // 'tenants.host',
      // 'tenants.port',
      // 'tenants.database',
      // 'tenants.username',
      // 'tenants.password',
      // 'tenants.prefix',
      // 'tenants.meta',
      // 'tenants.created_at',
      // 'tenants.updated_at',
      // 'tenants.deleted_at',
    ],
    // the relations map, we need some fields for eager load certain relations
    include: {
    },
    orderBy: "tenants.created_at",
    sortedBy: "desc",
    page: 1
  },
  loading: true,
  messages: null
};

export function reducer(state = initialState, action: tenant.Actions): State {
  switch (action.type) {
    case tenant.GET_FORM_MODEL: {
      return { ...state, loading: true };
    }

    case tenant.GET_FORM_MODEL_SUCCESS: {
      return { ...state, formModel: action.payload, loading: false };
    }

    case tenant.SET_SEARCH_QUERY: {
      let searchQuery = Object.assign({}, state.searchQuery, action.payload);
      return { ...state, searchQuery: searchQuery };
    }

    case tenant.PAGINATE: {
      return { ...state, loading: true };
    }

    case tenant.PAGINATE_SUCCESS: {
      return { ...state, pagination: action.payload as TenantPagination, loading: false };
    }

    case tenant.LIST: {
      return { ...state };
    }

    case tenant.LIST_SUCCESS: {
      return { ...state, list: action.payload };
    }

    case tenant.CREATE: {
      return { ...state, loading: true };
    }

    case tenant.GET_BY_ID: {
      return { ...state, loading: true };
    }

    case tenant.UPDATE: {
      return { ...state, loading: true };
    }

    case tenant.DELETE: {
      return { ...state, loading: true };
    }

    case tenant.RESTORE: {
      return { ...state, loading: true };
    }

    case tenant.SET_SELECTED: {
      return { ...state, selected: action.payload as Tenant, loading: false };
    }

    case tenant.SET_MESSAGES: {
      let msg = action.payload;

      // if messages already exists and you want to clean that messages,
      // exists messages must have been shown at least for 2 seconds
      // before they can be removed
      if(state.messages && state.messages.date && !msg) {
        let endTime = new Date().getTime();
        let startTime = state.messages.date.getTime();

        // at least 2 seconds must have happened to set the messages no null
        msg = ((endTime - startTime) / 1000 > 2) ? msg : state.messages ;
      }

      return { ...state, messages: msg };
    }

    default: {
      return state;
    }
  }
 }

export const getFormModel = (state: State) => state.formModel;
export const getLoading = (state: State) => state.loading;
export const getItemsList = (state: State) => state.list;
export const getItemsPagination = (state: State) => state.pagination;
export const getSelectedItem = (state: State) => state.selected;
export const getSearchQuery = (state: State) => state.searchQuery;
export const getMessages = (state: State) => state.messages;

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
export const getTenantSearchQuery = createSelector(getTenantState, fromTenant.getSearchQuery);
export const getTenantFormModel = createSelector(getTenantState, fromTenant.getFormModel);
// export const getTenantFormData = createSelector(() => ({  }));
export const getTenantList = createSelector(getTenantState, fromTenant.getItemsList);
export const getTenantPagination = createSelector(getTenantState, fromTenant.getItemsPagination);
export const getTenantSelected = createSelector(getTenantState, fromTenant.getSelectedItem);
export const getTenantLoading = createSelector(getTenantState, fromTenant.getLoading);
export const getTenantMessages = createSelector(getTenantState, fromTenant.getMessages);

----------------------------------------------------------------------------- */
