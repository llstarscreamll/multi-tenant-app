/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, inject, getTestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ngx-bootstrap';

import * as fromRoot from './../../../reducers';
import * as utils from './../../utils/tenant-testing.util';
import { ES } from './../../translations/es';

import { TenantSearchBasicComponent } from './tenant-search-basic.component';

describe('TenantSearchBasicComponent', () => {
  let fixture: ComponentFixture<TenantSearchBasicComponent>;
  let component: TenantSearchBasicComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TenantSearchBasicComponent],
      imports: [
        RouterTestingModule,
        HttpModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        Ng2BootstrapModule.forRoot(),
      ],
      providers: []
    }).compileComponents();

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

  it('should emit event on search btn click', () => {
    fixture.detectChanges();
    let searchField = fixture.nativeElement.querySelector('input[name=search]');
    let searchBtn = fixture.nativeElement.querySelector('button[type=submit]');

    expect(searchBtn).not.toBeNull();
    expect(searchField).not.toBeNull();
    
    searchField.value = 'foo search';
    searchBtn.click;
    
    fixture.detectChanges();

    component.search.subscribe(val => {
      expect(val).toContain({search: 'foo search', page: 1});
    });
  });

  it('should emit event on advanced search btn click', () => {    
    spyOn(component.filterBtnClick, 'emit');
    fixture.detectChanges();
    let advancedSearchBtn = fixture.nativeElement.querySelector('button[type=button].advanced-search-btn');

    expect(advancedSearchBtn).not.toBeNull();

    advancedSearchBtn.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.filterBtnClick.emit).toHaveBeenCalledWith();
  });
});
