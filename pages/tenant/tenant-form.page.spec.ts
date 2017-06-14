/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, getTestBed, inject, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './../../../reducers';

import * as utils from './../../utils/tenant-testing.util';
import { Tenant } from './../../models/tenant';
import { ES } from './../../translations/es';
import { TenantFormPage } from './tenant-form.page';
import { TenantComponents } from './../../components/tenant';
import { TenantPages } from './../../pages/tenant';
import { TenantService } from './../../services/tenant.service';

/**
 * TenantFormPage Tests.
 *
 * @author  [name] <[<email address>]>
 */
describe('TenantFormPage', () => {
  let mockBackend: MockBackend;
  let store: Store<fromRoot.State>;
  let fixture: ComponentFixture<TenantFormPage>;
  let component: TenantFormPage;
  let router: Router;
  let location: Location;
  let service: TenantService;
  const testModel: Tenant = utils.TenantOne;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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
    service = getTestBed().get(TenantService);

    mockBackend = getTestBed().get(MockBackend);
    utils.setupMockBackend(mockBackend);

    fixture = getTestBed().createComponent(TenantFormPage);
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

  it('should have certain elements', () => {
    fixture.detectChanges();
    const html = fixture.nativeElement;

    // should have sidebar-layout
    expect(html.querySelector('app-sidebar-layout')).not.toBeNull();

    // should have page header
    expect(html.querySelector('app-page-header')).not.toBeNull();

    // should have page content
    expect(html.querySelector('app-page-content')).not.toBeNull();

    // should have box where the form is located
    expect(html.querySelector('app-box app-box-body')).not.toBeNull();

    // should have form component inside app-box-body
    expect(html.querySelector('app-box-body tenant-form-component')).not.toBeNull();
  });

  it('should have default form type = create', () => {
    fixture.detectChanges();
    expect(component.formType).toBe('create');
  });

  it('should set form type = create based on current url', () => {
    spyOn(location, 'path').and.returnValue('tenant/create');
    fixture.detectChanges();

    expect(component.formType).toBe('create');
  });

  it('should set form type = details based on current url', () => {
    spyOn(location, 'path').and.returnValue('tenant/a1/details');
    fixture.detectChanges();

    expect(component.formType).toBe('details');
  });

  it('should set form type = edit based on current url', () => {
    spyOn(location, 'path').and.returnValue('tenant/a1/edit');
    fixture.detectChanges();

    expect(component.formType).toBe('edit');
  });
});
