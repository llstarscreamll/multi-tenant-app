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

/**
 * TenantService Class.
 *
 * @author  [name] <[<email address>]>
 */
@Injectable()
export class TenantService extends AbstractService {
	/**
   * API endpoint.
   * @type  string
   */
	protected API_ENDPOINT: string = 'v1/tenants';

  /**
   * The key to access language strings.
   * @type  string
   */
  public langKey: string = 'TENANT';

  /**
   * Langage key to access form fields translations.
   * @type  string
   */
  public fieldsLangKey: string = this.langKey + '.fields.tenants.';

  /**
   * The required columns to include on each API call.
   * @type  Array<string>
   */
  protected required_columns = [
    'tenants.id',
    'tenants.deleted_at',
  ];

  /**
   * TenantService contructor.
   */
	public constructor(
    private http: Http,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
  ) { super(); }

  /**
   * Get the Tenant form model.
   */
  public getFormModel(): Observable<any[]> {
    this.setAuthorizationHeader();

    return this.http
      .get(this.apiEndpoint('form-model'), { headers: this.headers })
      .map(res => { return res.json() })
      .catch(this.handleError);
  }

  /**
   * Get the Tenant form data.
   */
  public getFormData(): Observable<Object> {
    this.setAuthorizationHeader();

    return this.http
      .get(this.apiEndpoint('form-data'), { headers: this.headers })
      .map(res => { return res.json() })
      .catch(this.handleError);
  }

  /**
   * List Tenants.
   */
  public list(): Observable<Array<any>> {
    this.setAuthorizationHeader();

    return this.http
      .get(this.apiEndpoint('form/select-list'), { headers: this.headers })
      .map(res => { return res.json(); })
      .catch(this.handleError);
  }

  /**
   * Paginate Tenants.
   */
  public paginate(query: Object = {}): Observable<TenantPagination> {
    this.setAuthorizationHeader();
    let searchParams = this.parseGetParams(query);

    return this.http
      .get(this.apiEndpoint(), { headers: this.headers, search: searchParams })
      .map(res => {
        let response = res.json();

        return {
          data: response.data.map(item => Object.assign(new Tenant, item)),
          pagination: response.meta.pagination
        };
      }).catch(this.handleError);
  }

  /**
   * Create Tenant.
   */
  public create(item: Tenant): Observable<Tenant> {
    this.setAuthorizationHeader();

    return this.http
      .post(this.apiEndpoint('create'), item, { headers: this.headers })
      .map(res => { return Object.assign(new Tenant, res.json().data); })
      .catch(this.handleError);
  }

  /**
   * Get Tenant by id.
   */
  public getById(id: string | number): Observable<Tenant> {
    this.setAuthorizationHeader();

    let urlParams: URLSearchParams = new URLSearchParams;
    urlParams.set('include', '');
    return this.http
      .get(this.apiEndpoint(id), { headers: this.headers, search: urlParams })
      .map(res => { return Object.assign(new Tenant, res.json().data); })
      .catch(this.handleError);
  }

  /**
   * Update Tenant.
   */
  public update(id: string | number, item: Tenant): Observable<Tenant> {
    this.setAuthorizationHeader();

    return this.http
      .put(this.apiEndpoint(id), item, { headers: this.headers })
      .map(res => { return Object.assign(new Tenant, res.json().data); })
      .catch(this.handleError);
  }

  /**
   * Delete Tenant by id.
   */
  public delete(id: string): Observable<any> {
    this.setAuthorizationHeader();
    
    return this.http
      .delete(this.apiEndpoint(id), { headers: this.headers })
      .map(res => { return res.json().data })
      .catch(this.handleError);
  }

  /**
   * Get translated message.
   */
  public getMessage(msgKey: string = 'create_success', type: string = 'success'): AppMessage {
    let msg: string;

    this.translateService
      .get(this.langKey + '.msg.' + msgKey)
      .subscribe(trans => msg = trans);

    let appMessage: AppMessage = {
      message: msg,
      date: new Date(),
      errors: {},
      type: type,
      status_code: 200
    };

    return appMessage;
  }
}