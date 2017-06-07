import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { TranslateService } from '@ngx-translate/core';

import { AbstractService } from './../../core/services/abstract.service';
import { LocalStorageService } from './../../core/services/local-storage.service';
import { TenantPagination } from './../models/tenantPagination';
import { Tenant } from './../models/tenant';
import { AppMessage } from './../../core/models/appMessage';

@Injectable()
export class TenantService extends AbstractService {
	
	protected API_ENDPOINT: string = 'v1/tenants';
  public langNamespace: string = 'TENANT';
  public fieldsLangNamespace: string = 'TENANT.fields.tenants.';
  protected required_columns = [
    'tenants.id',
    'tenants.deleted_at',
  ];

	public constructor(
    private http: Http,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
  ) {
    super();
  }

  /**
   * Process the load Tenant request to the API.
   */
  public load(data: Object = {}): Observable<TenantPagination> {
    this.setAuthorizationHeader();
    let searchParams = this.parseGetParams(data);

    return this.http
      .get(this.apiEndpoint(), { headers: this.headers, search: searchParams })
      .map(res => { return { data: res.json().data, pagination: res.json().meta.pagination } })
      .catch(this.handleError);
  }

  public create(data: Object) {
    this.setAuthorizationHeader();

    return this.http
      .post(this.apiEndpoint('create'), data, { headers: this.headers })
      .map(res => { return res.json().data })
      .catch(this.handleError);
  }

  public createByName(data: Object) {
    this.setAuthorizationHeader();
    console.log(data);

    return this.http
      .post(this.apiEndpoint('create-by-name'), data, { headers: this.headers })
      .map(res => { return res.json().data })
      .catch(this.handleError);
  }

  public getTenantFormModel() {
    this.setAuthorizationHeader();

    return this.http
      .get(this.apiEndpoint('form-model'), { headers: this.headers })
      .map(res => { return res.json() })
      .catch(this.handleError);
  }

  public getTenantFormData() {
    this.setAuthorizationHeader();

    return this.http
      .get(this.apiEndpoint('form-data'), { headers: this.headers })
      .map(res => { return res.json() })
      .catch(this.handleError);
  }

  public getTenant(id) {
    this.setAuthorizationHeader();

    let urlParams: URLSearchParams = new URLSearchParams;
    urlParams.set('include', '');
    return this.http
      .get(this.apiEndpoint(id), { headers: this.headers, search: urlParams })
      .map(res => { return res.json().data })
      .catch(this.handleError);
  }

  public update(data: Tenant) {
    this.setAuthorizationHeader();

    return this.http
      .put(this.apiEndpoint(data.id), data, { headers: this.headers })
      .map(res => { return res.json().data })
      .catch(this.handleError);
  }

  public delete(id: string) {
    this.setAuthorizationHeader();
    
    return this.http
      .delete(this.apiEndpoint(id), { headers: this.headers })
      .map(res => { return res.json().data })
      .catch(this.handleError);
  }

  public getSuccessMessage(type: string = 'create'): AppMessage {
    let msg: string;

    this.translateService.get(this.langNamespace + '.msg.'+type+'_succcess').subscribe(val => msg = val);

    let appMessage: AppMessage = {
      message: msg,
      date: new Date(),
      errors: {},
      type: 'success',
      status_code: 200
    };

    return appMessage;
  }
}