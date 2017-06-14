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

import { TenantSearchBasicComponent } from './tenant-search-basic.component';
import { ES } from './../../translations/es';
import { TenantService } from './../../services/tenant.service';
import { Tenant } from './../../models/tenant';
import * as utils from './../../utils/tenant-testing.util';

/**
 * TenantSearchBasicComponent Tests.
 *
 * @author  [name] <[<email address>]>
 */
describe('TenantSearchBasicComponent', () => {
  let fixture: ComponentFixture<TenantSearchBasicComponent>;
  let component: TenantSearchBasicComponent;
  const testModel: Tenant = utils.TenantOne;
  let reactiveForm;
  let mockBackend: MockBackend;
  let store: Store<fromRoot.State>;
  let service: TenantService;
  let http: Http;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TenantSearchBasicComponent],
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

    fixture = getTestBed().createComponent(TenantSearchBasicComponent);
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

  it('should make TenantService paginate call on form submission', fakeAsync(() => {
    spyOn(service, 'paginate').and.returnValue(Observable.from([{}]));
    fixture.detectChanges();

    const searchField = fixture.nativeElement.querySelector('input[name=search]');
    const searchBtn = fixture.nativeElement.querySelector('button[type=submit]');

    expect(searchBtn).not.toBeNull();
    expect(searchField).not.toBeNull();

    searchField.value = 'foo search';
    searchBtn.click();

    fixture.detectChanges();
    tick();

    expect(service.paginate).toHaveBeenCalled();
  }));

  it('should emit event on advanced search btn click', () => {
    spyOn(component.advancedSearchBtnClick, 'emit');
    fixture.detectChanges();
    const advancedSearchBtn = fixture.nativeElement.querySelector('button[type=button].advanced-search-btn');

    expect(advancedSearchBtn).not.toBeNull();

    advancedSearchBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.advancedSearchBtnClick.emit).toHaveBeenCalledWith();
  });
});
