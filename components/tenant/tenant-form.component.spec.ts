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

import { TenantFormComponent } from './tenant-form.component';
import { ES } from './../../translations/es';
import { TenantService } from './../../services/tenant.service';
import { Tenant } from './../../models/tenant';
import * as utils from './../../utils/tenant-testing.util';

/**
 * TenantFormComponent Tests.
 *
 * @author  [name] <[<email address>]>
 */
describe('TenantFormComponent', () => {
  let fixture: ComponentFixture<TenantFormComponent>;
  let component: TenantFormComponent
  let formModel;
  const testModel: Tenant = utils.TenantOne;
  let reactiveForm;
  let mockBackend: MockBackend;
  let store: Store<fromRoot.State>;
  let service: TenantService;
  let http: Http;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TenantFormComponent],
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

    fixture = getTestBed().createComponent(TenantFormComponent);
    component = fixture.componentInstance;
  }));

  // setup language translations
  beforeEach(inject([TranslateService], (translateService: TranslateService) => {
    translateService.setTranslation('es', ES, true);
    translateService.setDefaultLang('es');
    translateService.use('es');
  }));

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have certain elements on create form', fakeAsync(() => {
    component.formType = 'create';

    fixture.detectChanges();
    tick();

    component.formDataReady = true;
    component.formData$ = Observable.from([utils.FORM_DATA]);

    fixture.detectChanges();
    tick();

    expect(component.formType).toBe('create');
    expect(fixture.nativeElement.querySelector('form')).not.toBeNull('create form should exists');

    expect(fixture.nativeElement.querySelector('[name=name]')).not.toBeNull('name field');
    expect(fixture.nativeElement.querySelector('[name=driver]')).not.toBeNull('driver field');
    expect(fixture.nativeElement.querySelector('[name=host]')).not.toBeNull('host field');
    expect(fixture.nativeElement.querySelector('[name=port]')).not.toBeNull('port field');
    expect(fixture.nativeElement.querySelector('[name=database]')).not.toBeNull('database field');
    expect(fixture.nativeElement.querySelector('[name=username]')).not.toBeNull('username field');
    expect(fixture.nativeElement.querySelector('[name=password]')).not.toBeNull('password field');
    expect(fixture.nativeElement.querySelector('[name=prefix]')).not.toBeNull('prefix field');
    expect(fixture.nativeElement.querySelector('[name=meta]')).not.toBeNull('meta field');

    // form links/buttons
    expect(fixture.nativeElement.querySelector('form button.btn.create-row')).not.toBeNull('create form btn should exists');
    expect(fixture.nativeElement.querySelector('form a.btn.show-all-rows')).not.toBeNull('show all form link should exists');
  }));

  it('should have certain elements on details form', fakeAsync(() => {
    component.formType = 'details';

    fixture.detectChanges();
    tick();

    component.formDataReady = true;
    component.formData$ = Observable.from([utils.FORM_DATA]);

    fixture.detectChanges();
    tick();

    expect(component.formType).toBe('details');
    expect(fixture.nativeElement.querySelector('form')).not.toBeNull('details form should exists');

    expect(fixture.nativeElement.querySelector('[name=id]:disabled')).not.toBeNull('id field');
    expect(fixture.nativeElement.querySelector('[name=name]:disabled')).not.toBeNull('name field');
    expect(fixture.nativeElement.querySelector('[name=driver]:disabled')).not.toBeNull('driver field');
    expect(fixture.nativeElement.querySelector('[name=host]:disabled')).not.toBeNull('host field');
    expect(fixture.nativeElement.querySelector('[name=port]:disabled')).not.toBeNull('port field');
    expect(fixture.nativeElement.querySelector('[name=database]:disabled')).not.toBeNull('database field');
    expect(fixture.nativeElement.querySelector('[name=username]:disabled')).not.toBeNull('username field');
    expect(fixture.nativeElement.querySelector('[name=password]:disabled')).not.toBeNull('password field');
    expect(fixture.nativeElement.querySelector('[name=prefix]:disabled')).not.toBeNull('prefix field');
    expect(fixture.nativeElement.querySelector('[name=meta]:disabled')).not.toBeNull('meta field');
    expect(fixture.nativeElement.querySelector('[name=created_at]:disabled')).not.toBeNull('created_at field');
    expect(fixture.nativeElement.querySelector('[name=updated_at]:disabled')).not.toBeNull('updated_at field');
    expect(fixture.nativeElement.querySelector('[name=deleted_at]:disabled')).not.toBeNull('deleted_at field');

    // form links/buttons
    expect(fixture.nativeElement.querySelector('form button.btn.edit-row')).not.toBeNull('edit form btn should exists');
    expect(fixture.nativeElement.querySelector('form button.btn.delete-row')).not.toBeNull('delete form btn should exists');
    expect(fixture.nativeElement.querySelector('form a.btn.show-all-rows')).not.toBeNull('show all form link should exists');
  }));

  it('should have certain elements on edit form', fakeAsync(() => {
    component.formType = 'edit';

    fixture.detectChanges();
    tick();

    component.formDataReady = true;
    component.formData$ = Observable.from([utils.FORM_DATA]);

    fixture.detectChanges();
    tick();

    expect(component.formType).toBe('edit');
    expect(fixture.nativeElement.querySelector('form')).not.toBeNull('edit form should exists');

    expect(fixture.nativeElement.querySelector('[name=name]')).not.toBeNull('name field should exists');
    expect(fixture.nativeElement.querySelector('[name=name]').value).toBe(testModel.name ? testModel.name : '', 'name field value');
    expect(fixture.nativeElement.querySelector('[name=driver]')).not.toBeNull('driver field should exists');
    expect(fixture.nativeElement.querySelector('[name=driver]').value).toBe(testModel.driver ? testModel.driver : '', 'driver field value');
    expect(fixture.nativeElement.querySelector('[name=host]')).not.toBeNull('host field should exists');
    expect(fixture.nativeElement.querySelector('[name=host]').value).toBe(testModel.host ? testModel.host : '', 'host field value');
    expect(fixture.nativeElement.querySelector('[name=port]')).not.toBeNull('port field should exists');
    expect(fixture.nativeElement.querySelector('[name=port]').value).toBe(testModel.port ? testModel.port : '', 'port field value');
    expect(fixture.nativeElement.querySelector('[name=database]')).not.toBeNull('database field should exists');
    expect(fixture.nativeElement.querySelector('[name=database]').value).toBe(testModel.database ? testModel.database : '', 'database field value');
    expect(fixture.nativeElement.querySelector('[name=username]')).not.toBeNull('username field should exists');
    expect(fixture.nativeElement.querySelector('[name=username]').value).toBe(testModel.username ? testModel.username : '', 'username field value');
    expect(fixture.nativeElement.querySelector('[name=password]')).not.toBeNull('password field should exists');
    expect(fixture.nativeElement.querySelector('[name=password]').value).toBe(testModel.password ? testModel.password : '', 'password field value');
    expect(fixture.nativeElement.querySelector('[name=prefix]')).not.toBeNull('prefix field should exists');
    expect(fixture.nativeElement.querySelector('[name=prefix]').value).toBe(testModel.prefix ? testModel.prefix : '', 'prefix field value');
    expect(fixture.nativeElement.querySelector('[name=meta]')).not.toBeNull('meta field should exists');
    expect(fixture.nativeElement.querySelector('[name=meta]').value).toBe(testModel.meta ? testModel.meta : '', 'meta field value');

    // form links/buttons
    expect(fixture.nativeElement.querySelector('form button.btn.edit-row')).not.toBeNull('edit form btn should exists');
    expect(fixture.nativeElement.querySelector('form button.btn.delete-row')).not.toBeNull('delete form btn should exists');
    expect(fixture.nativeElement.querySelector('form a.btn.show-all-rows')).not.toBeNull('show all form link should exists');
  }));

  it('should make certains TenantService calls on create form init', fakeAsync(() => {
    spyOn(service, 'getFormModel').and.returnValue(Observable.from([{}]));
    component.formType = 'create';

    fixture.detectChanges();
    tick();

    // should make form model/data api service calls
    expect(service.getFormModel).toHaveBeenCalled();
  }));

  it('should make certains TenantService calls on details form init', fakeAsync(() => {
    spyOn(service, 'getFormModel').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getById').and.returnValue(Observable.from([{}]));
    component.formType = 'details';

    fixture.detectChanges();
    tick();

    // should make form model/data/item api service calls
    expect(service.getFormModel).toHaveBeenCalled();
    expect(service.getById).toHaveBeenCalled();
  }));

  it('should make certains TenantService calls on edit form init', fakeAsync(() => {
    spyOn(service, 'getFormModel').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getById').and.returnValue(Observable.from([{}]));
    component.formType = 'edit';

    fixture.detectChanges();
    tick();

    // should make form model/data/item api service calls
    expect(service.getFormModel).toHaveBeenCalled();
    expect(service.getById).toHaveBeenCalled();
  }));

  it('should make api call when create form submitted', fakeAsync(() => {
    spyOn(service, 'create').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getMessage');
    component.formType = 'create';

    fixture.detectChanges();
    tick();

    component.formDataReady = true;
    component.formData$ = Observable.from([utils.FORM_DATA]);

    fixture.detectChanges();
    tick();

    expect(component.form.valid).toBe(false, 'form init as invalid');
    expect(fixture.nativeElement.querySelector('form button.create-row').disabled).toBe(true, 'create form btn disabled');

    component.form.patchValue({...testModel, password: 'foo_password'});
    component.form.markAsDirty();
    component.form.markAsTouched();

    fixture.detectChanges();

    expect(component.form.valid).toBe(true, 'form is now valid');
    fixture.nativeElement.querySelector('form button.create-row').click();

    fixture.detectChanges();
    tick();

    // should make create post api call
    expect(service.create).toHaveBeenCalled();
    expect(service.getMessage).toHaveBeenCalledWith('create_success');
  }));

  it('should make update api call when edit form submitted', fakeAsync(() => {
    spyOn(service, 'update').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getMessage');
    component.formType = 'edit';

    fixture.detectChanges();
    tick();

    component.formDataReady = true;
    component.formData$ = Observable.from([utils.FORM_DATA]);
    component.form.patchValue({password: 'foo_password'});

    fixture.detectChanges();
    tick();

    expect(component.form.valid).toBe(true, 'form is valid');
    fixture.nativeElement.querySelector('form button.edit-row').click();

    fixture.detectChanges();
    tick();

    // should make edit post api call
    expect(service.update).toHaveBeenCalled();
    expect(service.getMessage).toHaveBeenCalledWith('update_success');
  }));

  it('should make delete api call when delete btn clicked', fakeAsync(() => {
    spyOn(service, 'delete').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getMessage');
    component.formType = 'details';

    fixture.detectChanges();
    tick();

    component.formDataReady = true;
    component.formData$ = Observable.from([utils.FORM_DATA]);
    component.form.patchValue({password: 'foo_password'});

    fixture.detectChanges();
    tick();

    expect(component.form.valid).toBe(true, 'form is valid');
    fixture.nativeElement.querySelector('form button.delete-row').click();

    fixture.detectChanges();

    // should open sweetalert2 for confirmation
    fixture.nativeElement.querySelector('button.swal2-confirm').click();

    fixture.detectChanges();
    tick(200);

    // should make delete api call on service
    expect(service.delete).toHaveBeenCalled();
    expect(service.getMessage).toHaveBeenCalledWith('delete_success');
  }));

  it('should navigate when show all btn clicked', fakeAsync(() => {
    component.formType = 'details';

    fixture.detectChanges();
    tick();

    component.formDataReady = true;
    component.formData$ = Observable.from([utils.FORM_DATA]);

    fixture.detectChanges();
    tick();

    spyOn(router, 'navigateByUrl');
    fixture.nativeElement.querySelector('a.btn.show-all-rows').click();

    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(
      jasmine.stringMatching('/tenant'),
      { skipLocationChange: false, replaceUrl: false }
    );
  }));
});
