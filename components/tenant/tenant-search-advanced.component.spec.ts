/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, inject, getTestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import * as fromRoot from './../../../reducers';
import { DynamicFormModule } from './../../../dynamic-form/dynamic-form.module';
import { FormModelParserService } from './../../../dynamic-form/services/form-model-parser.service';

import { TenantSearchAdvancedComponent } from './tenant-search-advanced.component';
import { ES } from './../../translations/es';
import { TenantService } from './../../services/tenant.service';
import { Tenant } from './../../models/tenant';
import * as utils from './../../utils/tenant-testing.util';
import { AUTH_TESTING_COMPONENTS } from 'app/auth/utils/auth-testing-utils';

/**
 * TenantSearchAdvancedComponent Tests.
 *
 * @author  [name] <[<email address>]>
 */
describe('TenantSearchAdvancedComponent', () => {
  let fixture: ComponentFixture<TenantSearchAdvancedComponent>;
  let component: TenantSearchAdvancedComponent;
  const testModel: Tenant = utils.TenantOne;
  let reactiveForm;
  let mockBackend: MockBackend;
  let store: Store<fromRoot.State>;
  let service: TenantService;
  let http: Http;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [...AUTH_TESTING_COMPONENTS, TenantSearchAdvancedComponent],
      imports: [
        utils.IMPORTS
      ],
      providers: [
        utils.PROVIDERS
      ]
    }).compileComponents();

    store = getTestBed().get(Store);
    router = getTestBed().get(Router);
    http = getTestBed().get(Http);
    service = getTestBed().get(TenantService);

    mockBackend = getTestBed().get(MockBackend);
    utils.setupMockBackend(mockBackend);

    fixture = getTestBed().createComponent(TenantSearchAdvancedComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(inject([TranslateService], (translateService: TranslateService) => {
    translateService.setTranslation('es', ES, true);
    translateService.setDefaultLang('es');
    translateService.use('es');
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have certain elements', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    component.formDataReady = true;
    component.formData$ = Observable.from([utils.FORM_DATA]);

    fixture.detectChanges();
    tick();

    const html = fixture.nativeElement;

    // should have app-alerts element
    expect(html.querySelector('app-alerts')).not.toBeNull();

    // should have search columns/options
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.id"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.name"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.driver"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.host"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.port"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.database"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.username"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.password"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.prefix"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.meta"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.created_at"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.updated_at"]')).not.toBeNull();
    expect(html.querySelector('tabset tab:first-child [name=filter][value="tenants.deleted_at"]')).not.toBeNull();


    // should have search fields
    expect(html.querySelector('tabset tab:nth-child(2) [name=id]')).not.toBeNull('id field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=name]')).not.toBeNull('name field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=driver]')).not.toBeNull('driver field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=host]')).not.toBeNull('host field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=port]')).not.toBeNull('port field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=database]')).not.toBeNull('database field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=username]')).not.toBeNull('username field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=password]')).not.toBeNull('password field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=prefix]')).not.toBeNull('prefix field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=meta]')).not.toBeNull('meta field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=created_at_from]')).not.toBeNull('created_at_from field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=created_at_to]')).not.toBeNull('created_at_to field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=updated_at_from]')).not.toBeNull('updated_at_from field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=updated_at_to]')).not.toBeNull('updated_at_to field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=deleted_at_from]')).not.toBeNull('deleted_at_from field');
    expect(html.querySelector('tabset tab:nth-child(2) [name=deleted_at_to]')).not.toBeNull('deleted_at_to field');

    // should have submit btn
    expect(html.querySelector('button.btn.btn-lg.btn-block')).not.toBeNull();
  }));

  it('should make certains TenantService calls on search form init', fakeAsync(() => {
    spyOn(service, 'getFormModel').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    // should make form model/data api service calls
    expect(service.getFormModel).toHaveBeenCalled();
  }));

  it('should make TenantService paginate call on form submission', fakeAsync(() => {
    spyOn(service, 'paginate').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    component.formDataReady = true;
    component.formData$ = Observable.from([utils.FORM_DATA]);

    fixture.detectChanges();
    tick();

    // fill input an trigger event to make reactiveForm dirty and touched
    fixture.nativeElement.querySelector('[name=id]').value = testModel.id;
    fixture.nativeElement.querySelector('[name=id]').dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    // click button to submit form
    fixture.nativeElement.querySelector('form button.btn.btn-lg').click();

    fixture.detectChanges();
    tick();

    expect(component.form.get('search').get('id').value).toBe(testModel.id);
    expect(fixture.nativeElement.querySelector('[name=id]').value).toContain(testModel.id);
    expect(service.paginate).toHaveBeenCalled();
  }));
});
