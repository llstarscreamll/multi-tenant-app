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

import { TenantsTableComponent } from './tenants-table.component';
import * as tenantActions from './../../actions/tenant.actions';
import { ES } from './../../translations/es';
import { TenantService } from './../../services/tenant.service';
import { Tenant } from './../../models/tenant';
import * as utils from './../../utils/tenant-testing.util';
import { AUTH_TESTING_COMPONENTS } from 'app/auth/utils/auth-testing-utils';

/**
 * TenantsTableComponent Tests.
 *
 * @author  [name] <[<email address>]>
 */
describe('TenantsTableComponent', () => {
  let fixture: ComponentFixture<TenantsTableComponent>;
  let component: TenantsTableComponent;
  const testModel: Tenant = utils.TenantOne;
  let reactiveForm;
  let mockBackend: MockBackend;
  let store: Store<fromRoot.State>;
  let service: TenantService;
  let http: Http;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [...AUTH_TESTING_COMPONENTS, TenantsTableComponent],
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

    fixture = getTestBed().createComponent(TenantsTableComponent);
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

  it('should make certain TenantService calls on ngOnInit', fakeAsync(() => {
    spyOn(service, 'paginate').and.returnValue(Observable.from([{data: [], pagination: {}}])); // empty data
    spyOn(service, 'getFormModel').and.returnValue(Observable.from([{}]));

    fixture.detectChanges();
    tick();

    expect(service.paginate).toHaveBeenCalled();
    expect(service.getFormModel).not.toHaveBeenCalled();
  }));

  it('should show alert msg on empty list', fakeAsync(() => {
    spyOn(service, 'paginate').and.returnValue(Observable.from([{data: [], pagination: {}}])); // empty data

    fixture.detectChanges();
    tick();

    const msgElem = fixture.nativeElement.querySelector('div.alert');

    expect(msgElem).not.toBeNull();
    expect(msgElem.textContent).toContain('No se encontraron registros...');
  }));

  it('should have a table', fakeAsync(() => {
    spyOn(service, 'paginate').and.returnValue(Observable.from([{data: [], pagination: {}}])); // empty data

    fixture.detectChanges();
    tick();

    const table = fixture.nativeElement.querySelector('table.table-hover');

    // the table should exists
    expect(table).not.toBeNull();

    // and should have entity attributes as headings
    expect(table.querySelector('thead tr th.id'));
    expect(table.querySelector('thead tr th.name'));
    expect(table.querySelector('thead tr th.driver'));
    expect(table.querySelector('thead tr th.host'));
    expect(table.querySelector('thead tr th.port'));
    expect(table.querySelector('thead tr th.database'));
    expect(table.querySelector('thead tr th.username'));
    expect(table.querySelector('thead tr th.password'));
    expect(table.querySelector('thead tr th.prefix'));
    expect(table.querySelector('thead tr th.meta'));
    expect(table.querySelector('thead tr th.created_at'));
    expect(table.querySelector('thead tr th.updated_at'));
    expect(table.querySelector('thead tr th.deleted_at'));

    // should have a "actions" column
    expect(table.querySelector('thead tr th.action'));
  }));

  it('should have body table with action links/buttons', fakeAsync(() => {
    spyOn(service, 'paginate').and.returnValue(Observable.from([{data: utils.TenantList, pagination: {}}]));

    fixture.detectChanges();
    tick();

    const table = fixture.nativeElement.querySelector('table.table-hover');

    expect(table.querySelector('tbody').children.length).toEqual(2); // two rows
    expect(table.querySelector('tbody tr > td a.details-link')).not.toBeNull(); // first row details link
    expect(table.querySelector('tbody tr > td a.edit-link')).not.toBeNull(); // first row edit link
    expect(table.querySelector('tbody tr > td a.delete-link')).not.toBeNull(); // first row delete link
  }));

  it('should emit event/navigate on links click', fakeAsync(() => {
    spyOn(service, 'paginate').and.returnValue(Observable.from([{data: utils.TenantList, pagination: {}}]));
    spyOn(router, 'navigateByUrl');

    fixture.detectChanges();
    tick();

    const table = fixture.nativeElement.querySelector('table.table-hover');
    const field = 'name';
    spyOn(store, 'dispatch');

    // table heading links
    table.querySelector('thead tr:first-child th.tenants\\.' + field + ' span').click();

    fixture.detectChanges();
    tick();

    expect(store.dispatch).toHaveBeenCalledWith(new tenantActions.SetSearchQueryAction({
      'orderBy': 'tenants.' + field,
      'sortedBy': 'asc'
    }));

    // details link click
    table.querySelector('tbody tr:first-child td a.details-link').click();
    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(
      jasmine.stringMatching('/tenant/' + utils.TenantList[0].id + '/details'),
      { skipLocationChange: false, replaceUrl: false }
    );

    // edit link click
    table.querySelector('tbody tr:first-child td a.edit-link').click();
    fixture.detectChanges();

    expect(router.navigateByUrl).toHaveBeenCalledWith(
      jasmine.stringMatching('/tenant/' + utils.TenantList[0].id  + '/edit'),
      { skipLocationChange: false, replaceUrl: false }
    );

    // delete link click
    spyOn(component, 'deleteRow');
    table.querySelector('tbody tr:first-child td a.delete-link').click();
    fixture.detectChanges();

    // the component.deleteRow method has full test on TenantFormComponent
    expect(component.deleteRow).toHaveBeenCalledWith(utils.TenantList[0].id);
  }));
});
