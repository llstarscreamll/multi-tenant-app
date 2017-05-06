/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, getTestBed, inject, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './../../../reducers';
import { AuthGuard } from './../../../auth/guards/auth.guard';

import * as utils from './../../utils/tenant-testing.util';
import { Tenant } from './../../models/tenant';
import { ES } from './../../translations/es';
import { TenantFormPage } from './tenant-form.page';
import { TenantComponents } from './../../components/tenant';
import { TenantContainers } from './../../containers/tenant';
import { TenantService } from './../../services/tenant.service';

describe('TenantFormPage', () => {
  let mockBackend: MockBackend;
  let store: Store<fromRoot.State>;
  let fixture: ComponentFixture<TenantFormPage>;
  let component: TenantFormPage;
  let router: Router;
  let location: Location;
  let authGuard: AuthGuard;
  let service: TenantService;
  let http: Http;
  let testModel: Tenant = utils.TenantOne;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...TenantComponents,
        ...TenantContainers,
      ],
      imports: [
        ...utils.CONTAINERS_IMPORTS,
      ],
      providers: [
        ...utils.CONTAINERS_PROVIDERS,
      ]
    }).compileComponents();

    store = getTestBed().get(Store);
    router = getTestBed().get(Router);
    location = getTestBed().get(Location);
    authGuard = getTestBed().get(AuthGuard);
    http = getTestBed().get(Http);
    service = getTestBed().get(TenantService);

    mockBackend = getTestBed().get(MockBackend);
    utils.setupMockBackend(mockBackend);
    
    fixture = getTestBed().createComponent(TenantFormPage);
    component = fixture.componentInstance;

    spyOn(authGuard, 'canActivate').and.returnValue(true);
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

  it('should have certain setup for create form', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant/create');
    spyOn(service, 'getTenantFormData').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    expect(fixture.nativeElement.querySelector('h1')).not.toBeNull('should have h1 heading');
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Tenants');
    expect(fixture.nativeElement.querySelector('h1 small')).not.toBeNull('should have small heading');
    expect(fixture.nativeElement.querySelector('h1 small').textContent).toContain('Crear');
    
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

  it('should have certain setup for details form', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant/' + testModel.id + '/details');
    spyOn(service, 'getTenantFormData').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    expect(fixture.nativeElement.querySelector('h1')).not.toBeNull('should have h1 heading');
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Tenants');
    expect(fixture.nativeElement.querySelector('h1 small')).not.toBeNull('should have small heading');
    expect(fixture.nativeElement.querySelector('h1 small').textContent).toContain('Detalles');
    
    expect(component.formType).toBe('details');
    expect(fixture.nativeElement.querySelector('form')).not.toBeNull('details form should exists');

    expect(fixture.nativeElement.querySelector('[name=id]:disabled')).not.toBeNull('id field should exists');
    expect(fixture.nativeElement.querySelector('[name=id]:disabled').value).toContain(testModel.id ? testModel.id : '', 'id field value');
    expect(fixture.nativeElement.querySelector('[name=name]:disabled')).not.toBeNull('name field should exists');
    expect(fixture.nativeElement.querySelector('[name=name]:disabled').value).toBe(testModel.name ? testModel.name : '', 'name field value');
    expect(fixture.nativeElement.querySelector('[name=driver]:disabled')).not.toBeNull('driver field should exists');
    expect(fixture.nativeElement.querySelector('[name=driver]:disabled').value).toBe(testModel.driver ? testModel.driver : '', 'driver field value');
    expect(fixture.nativeElement.querySelector('[name=host]:disabled')).not.toBeNull('host field should exists');
    expect(fixture.nativeElement.querySelector('[name=host]:disabled').value).toBe(testModel.host ? testModel.host : '', 'host field value');
    expect(fixture.nativeElement.querySelector('[name=port]:disabled')).not.toBeNull('port field should exists');
    expect(fixture.nativeElement.querySelector('[name=port]:disabled').value).toBe(testModel.port ? testModel.port : '', 'port field value');
    expect(fixture.nativeElement.querySelector('[name=database]:disabled')).not.toBeNull('database field should exists');
    expect(fixture.nativeElement.querySelector('[name=database]:disabled').value).toBe(testModel.database ? testModel.database : '', 'database field value');
    expect(fixture.nativeElement.querySelector('[name=username]:disabled')).not.toBeNull('username field should exists');
    expect(fixture.nativeElement.querySelector('[name=username]:disabled').value).toBe(testModel.username ? testModel.username : '', 'username field value');
    expect(fixture.nativeElement.querySelector('[name=password]:disabled')).not.toBeNull('password field should exists');
    expect(fixture.nativeElement.querySelector('[name=password]:disabled').value).toBe(testModel.password ? testModel.password : '', 'password field value');
    expect(fixture.nativeElement.querySelector('[name=prefix]:disabled')).not.toBeNull('prefix field should exists');
    expect(fixture.nativeElement.querySelector('[name=prefix]:disabled').value).toBe(testModel.prefix ? testModel.prefix : '', 'prefix field value');
    expect(fixture.nativeElement.querySelector('[name=meta]:disabled')).not.toBeNull('meta field should exists');
    expect(fixture.nativeElement.querySelector('[name=meta]:disabled').value).toBe(testModel.meta ? testModel.meta : '', 'meta field value');
    expect(fixture.nativeElement.querySelector('[name=created_at]:disabled')).not.toBeNull('created_at field should exists');
    expect(fixture.nativeElement.querySelector('[name=created_at]:disabled').value).toBe(testModel.created_at ? testModel.created_at : '', 'created_at field value');
    expect(fixture.nativeElement.querySelector('[name=updated_at]:disabled')).not.toBeNull('updated_at field should exists');
    expect(fixture.nativeElement.querySelector('[name=updated_at]:disabled').value).toBe(testModel.updated_at ? testModel.updated_at : '', 'updated_at field value');
    expect(fixture.nativeElement.querySelector('[name=deleted_at]:disabled')).not.toBeNull('deleted_at field should exists');
    expect(fixture.nativeElement.querySelector('[name=deleted_at]:disabled').value).toBe(testModel.deleted_at ? testModel.deleted_at : '', 'deleted_at field value');

    // form links/buttons
    expect(fixture.nativeElement.querySelector('form button.btn.edit-row')).not.toBeNull('edit form btn should exists');
    expect(fixture.nativeElement.querySelector('form button.btn.delete-row')).not.toBeNull('delete form btn should exists');
    expect(fixture.nativeElement.querySelector('form a.btn.show-all-rows')).not.toBeNull('show all form link should exists');
  }));

  it('should have certain setup for edit form', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant/' + testModel.id + '/edit');
    spyOn(service, 'getTenantFormData').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    expect(fixture.nativeElement.querySelector('h1')).not.toBeNull('should have h1 heading');
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Tenants');
    expect(fixture.nativeElement.querySelector('h1 small')).not.toBeNull('should have small heading');
    expect(fixture.nativeElement.querySelector('h1 small').textContent).toContain('Editar');
    
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
    spyOn(location, 'path').and.returnValue('/tenant/create');
    spyOn(service, 'getTenantFormModel').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getTenantFormData').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    // should make form model/data api service calls
    expect(service.getTenantFormModel).toHaveBeenCalled();
    expect(service.getTenantFormData).toHaveBeenCalled();
  }));

  it('should make certains TenantService calls on details form init', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant/' + testModel.id + '/details');
    spyOn(service, 'getTenantFormModel').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getTenantFormData').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getTenant').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    // should make form model/data/row api service calls
    expect(service.getTenantFormModel).toHaveBeenCalled();
    expect(service.getTenantFormData).toHaveBeenCalled();
    expect(service.getTenantFormData).toHaveBeenCalled();
  }));

  it('should make certains TenantService calls on edit form init', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant/' + testModel.id + '/edit');
    spyOn(service, 'getTenantFormModel').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getTenantFormData').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getTenant').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    // should make form model/data/row api service calls
    expect(service.getTenantFormModel).toHaveBeenCalled();
    expect(service.getTenantFormData).toHaveBeenCalled();
    expect(service.getTenantFormData).toHaveBeenCalled();
  }));

  it('should make create api call when create form submitted', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant/create');
    spyOn(service, 'create').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getSuccessMessage');

    fixture.detectChanges();
    tick();
    
    expect(component.tenantForm.valid).toBe(false);
    component.tenantForm.patchValue(testModel);

    fixture.detectChanges();

    expect(component.tenantForm.valid).toBe(true);
    fixture.nativeElement.querySelector('form button.create-row').click();

    fixture.detectChanges();
    tick();

    // should make create post api call
    expect(service.create).toHaveBeenCalled();
    expect(service.getSuccessMessage).toHaveBeenCalledWith('create');
  }));

  it('should make update api call when edit form submitted', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant/' + testModel.id + '/edit');
    spyOn(service, 'update').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getSuccessMessage');

    fixture.detectChanges();
    tick();
    
    expect(component.tenantForm.valid).toBe(true);
    fixture.nativeElement.querySelector('form button.edit-row').click();

    fixture.detectChanges();
    tick();

    // should make edit post api call
    expect(service.update).toHaveBeenCalled();
    expect(service.getSuccessMessage).toHaveBeenCalledWith('update');
  }));

  it('should make delete api call when delete btn clicked', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant/' + testModel.id + '/edit');
    spyOn(service, 'delete').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getSuccessMessage');

    fixture.detectChanges();
    tick();
    
    expect(component.tenantForm.valid).toBe(true);
    fixture.nativeElement.querySelector('form button.delete-row').click();

    fixture.detectChanges();

    // should open sweetalert2 for confirmation
    fixture.nativeElement.querySelector('button.swal2-confirm').click();

    fixture.detectChanges();
    tick(200);

    // should make edit post api call
    expect(service.delete).toHaveBeenCalled();
    expect(service.getSuccessMessage).toHaveBeenCalledWith('delete');
  }));

  it('should navigate when show all btn clicked', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant/' + testModel.id + '/edit');
    spyOn(service, 'delete').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getSuccessMessage');

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
