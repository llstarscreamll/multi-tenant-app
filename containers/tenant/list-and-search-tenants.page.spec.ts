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
import { ListAndSearchTenantsPage } from './list-and-search-tenants.page';
import { TenantComponents } from './../../components/tenant';
import { TenantContainers } from './../../containers/tenant';
import { TenantService } from './../../services/tenant.service';

describe('ListAndSearchTenantsPage', () => {
  let mockBackend: MockBackend;
  let store: Store<fromRoot.State>;
  let fixture: ComponentFixture<ListAndSearchTenantsPage>;
  let component: ListAndSearchTenantsPage;
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
    
    fixture = getTestBed().createComponent(ListAndSearchTenantsPage);
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

  it('should have certain html components', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant');
    spyOn(service, 'load').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    expect(fixture.nativeElement.querySelector('tenant-search-basic-component')).not.toBeNull('basic search component');
    expect(fixture.nativeElement.querySelector('tenant-search-advanced-component')).toBeNull('advanced search component');
    expect(fixture.nativeElement.querySelector('tenants-table-component')).not.toBeNull('table list component');

    // click btn to display advanced search form
    fixture.nativeElement.querySelector('tenant-search-basic-component form button.advanced-search-btn').click();

    fixture.detectChanges();
    tick(500);

    expect(fixture.nativeElement.querySelector('tenant-search-advanced-component')).not.toBeNull('advanced search component');
  }));

  it('should navigate on create btn click', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant');
    spyOn(service, 'load').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    spyOn(router, 'navigateByUrl');
    fixture.nativeElement.querySelector('a.btn i.glyphicon-plus').click();

    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(
      jasmine.stringMatching('/tenant/create'),
      { skipLocationChange: false, replaceUrl: false }
    );
  }));

  it('should show advanced search form on btn click', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant');
    spyOn(service, 'load').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    expect(component.showSearchOptions).toBe(false);
    expect(fixture.nativeElement.querySelector('tenant-search-advanced-component')).toBeNull('advanced search component');

    fixture.nativeElement.querySelector('tenant-search-basic-component form button.advanced-search-btn').click();

    fixture.detectChanges();
    tick(500);

    expect(component.showSearchOptions).toBe(true);
    expect(fixture.nativeElement.querySelector('tenant-search-advanced-component')).not.toBeNull('advanced search component');
  }));

  it('should make certain TenantService calls on ngOnInit', fakeAsync(() => {
    spyOn(location, 'path').and.returnValue('/tenant');
    spyOn(service, 'load').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getTenantFormModel').and.returnValue(Observable.from([{}]));
    spyOn(service, 'getTenantFormData').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    expect(service.load).toHaveBeenCalled();
    expect(service.getTenantFormModel).toHaveBeenCalled();
    expect(service.getTenantFormData).toHaveBeenCalled();
  }));
});
