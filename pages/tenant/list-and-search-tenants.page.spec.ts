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

import * as utils from './../../utils/tenant-testing.util';
import { Tenant } from './../../models/tenant';
import { ES } from './../../translations/es';
import { ListAndSearchTenantsPage } from './list-and-search-tenants.page';
import { TenantComponents } from './../../components/tenant';
import { TenantPages } from './../../pages/tenant';
import { TenantService } from './../../services/tenant.service';
import { AUTH_TESTING_COMPONENTS } from 'app/auth/utils/auth-testing-utils';

/**
 * ListAndSearchTenantsPage Tests.
 *
 * @author  [name] <[<email address>]>
 */
describe('ListAndSearchTenantsPage', () => {
  let mockBackend: MockBackend;
  let store: Store<fromRoot.State>;
  let fixture: ComponentFixture<ListAndSearchTenantsPage>;
  let component: ListAndSearchTenantsPage;
  let router: Router;
  let location: Location;
  let service: TenantService;
  let http: Http;
  const testModel: Tenant = utils.TenantOne;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ...AUTH_TESTING_COMPONENTS,
        ...TenantComponents,
        ...TenantPages,
      ],
      imports: [
        ...utils.IMPORTS,
      ],
      providers: [
        ...utils.PROVIDERS,
      ]
    }).compileComponents();

    store = getTestBed().get(Store);
    router = getTestBed().get(Router);
    location = getTestBed().get(Location);
    http = getTestBed().get(Http);
    service = getTestBed().get(TenantService);

    mockBackend = getTestBed().get(MockBackend);
    utils.setupMockBackend(mockBackend);

    fixture = getTestBed().createComponent(ListAndSearchTenantsPage);
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

  it('should have certain html components', fakeAsync(() => {
    spyOn(service, 'paginate').and.returnValue(Observable.from([{data: [], pagination: {}}])); // empty data

    fixture.detectChanges();
    tick();

    const html = fixture.nativeElement;

    expect(html.querySelector('tenant-search-basic-component')).not.toBeNull('basic search component');
    expect(html.querySelector('tenants-table-component')).not.toBeNull('table list component');
    expect(html.querySelector('tenant-search-advanced-component')).toBeNull('advanced search component');

    // click btn to display advanced search form
    html.querySelector('tenant-search-basic-component form button.advanced-search-btn').click();

    fixture.detectChanges();
    tick(500);

    expect(html.querySelector('tenant-search-advanced-component')).not.toBeNull('advanced search component');
  }));

  it('should navigate on create btn click', fakeAsync(() => {
    spyOn(service, 'paginate').and.returnValue(Observable.from([{data: [], pagination: {}}])); // empty data

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
    spyOn(service, 'paginate').and.returnValue(Observable.from([{data: [], pagination: {}}])); // empty data

    fixture.detectChanges();
    tick();

    expect(component.showAdvancedSearchForm).toBe(false);
    expect(fixture.nativeElement.querySelector('tenant-search-advanced-component')).toBeNull('advanced search component');

    fixture.nativeElement.querySelector('tenant-search-basic-component form button.advanced-search-btn').click();

    fixture.detectChanges();
    tick(500);

    expect(component.showAdvancedSearchForm).toBe(true);
    expect(fixture.nativeElement.querySelector('tenant-search-advanced-component')).not.toBeNull('advanced search component');
  }));
});
