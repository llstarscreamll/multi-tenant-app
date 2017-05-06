/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, inject, getTestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ngx-bootstrap';

import * as fromRoot from './../../../reducers';
import * as utils from './../../utils/tenant-testing.util';
import { ES } from './../../translations/es';

import { TenantsTableComponent } from './tenants-table.component';

describe('TenantsTableComponent', () => {
  let fixture: ComponentFixture<TenantsTableComponent>;
  let component: TenantsTableComponent;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TenantsTableComponent],
      imports: [
        RouterTestingModule,
        HttpModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        Ng2BootstrapModule.forRoot(),
      ],
      providers: []
    }).compileComponents();

    fixture = getTestBed().createComponent(TenantsTableComponent);
    component = fixture.componentInstance;
    router = getTestBed().get(Router);

    component.tenants = [];
    component.columns = utils.tableColumns;
    component.translateKey = utils.translateKey;
    component.sortedBy = 'desc';
    component.orderBy = 'tenants.created_at';
    component.pagination = {
      count: 0,
      current_page: 0,
      links: {
        next: '',
        previous: '',
      },
      per_page: 15,
      total: 0,
      total_pages: 0
    };
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

  it('should show alert msg on empty list', () => {
    fixture.detectChanges();
    let elem = fixture.nativeElement.querySelector('div.alert');

    expect(elem).not.toBeNull();
    expect(elem.textContent).toContain('No se encontraron registros...');
  });

  it('should have a table', () => {
    fixture.detectChanges();
    let table = fixture.nativeElement.querySelector('table.table-hover');

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
  });

  it('should have table with action links/buttons', () => {
    component.tenants = utils.TenantList;
    fixture.detectChanges();

    let table = fixture.nativeElement.querySelector('table.table-hover');

    expect(table.querySelector('tbody').children.length).toEqual(2);
    expect(table.querySelector('tbody tr td a.details-link')).not.toBeNull();
    expect(table.querySelector('tbody tr td a.edit-link')).not.toBeNull();
    expect(table.querySelector('tbody tr td a.delete-link')).not.toBeNull();
  });

  it('should emit event/navigate on links click', () => {
    component.tenants = utils.TenantList;
    fixture.detectChanges();
    spyOn(router, 'navigateByUrl');
    spyOn(component.deleteBtnClicked, 'emit');
    spyOn(component.updateSearch, 'emit');

    let table = fixture.nativeElement.querySelector('table.table-hover');

    // table heading links
    table.querySelector('thead tr:first-child th.tenants\\.name span').click();
    fixture.detectChanges();
    
    expect(component.updateSearch.emit).toHaveBeenCalledWith({ orderBy: 'tenants.name', sortedBy: 'asc' });

    // details button
    table.querySelector('tbody tr:first-child td a.details-link').click();
    fixture.detectChanges();
    
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      jasmine.stringMatching('/tenant/' + component.tenants[0].id + '/details'),
      { skipLocationChange: false, replaceUrl: false }
    );

    // edit button
    table.querySelector('tbody tr:first-child td a.edit-link').click();
    fixture.detectChanges();
    
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      jasmine.stringMatching('/tenant/' + component.tenants[0].id + '/edit'),
      { skipLocationChange: false, replaceUrl: false }
    );

    // delete button
    table.querySelector('tbody tr:first-child td a.delete-link').click();
    fixture.detectChanges();
    
    expect(component.deleteBtnClicked.emit).toHaveBeenCalledWith(component.tenants[0].id);
  });
});
