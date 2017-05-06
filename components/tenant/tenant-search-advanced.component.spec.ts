/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, inject, getTestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ngx-bootstrap';

import * as fromRoot from './../../../reducers';
import { DynamicFormModule } from './../../../dynamic-form/dynamic-form.module';
import { FormModelParserService } from './../../../dynamic-form/services/form-model-parser.service';
import * as utils from './../../utils/tenant-testing.util';
import { ES } from './../../translations/es';

import { TenantSearchAdvancedComponent } from './tenant-search-advanced.component';

describe('TenantSearchAdvancedComponent', () => {
  let fixture: ComponentFixture<TenantSearchAdvancedComponent>;
  let component: TenantSearchAdvancedComponent;
  let formModel;
  let reactiveForm;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TenantSearchAdvancedComponent],
      imports: [
        RouterTestingModule,
        HttpModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        Ng2BootstrapModule.forRoot(),
        DynamicFormModule,
      ],
      providers: []
    }).compileComponents();

    fixture = getTestBed().createComponent(TenantSearchAdvancedComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(inject([FormModelParserService], (fmps: FormModelParserService) => {
    formModel = fmps.parse(utils.FORM_MODEL);
    formModel = fmps.parseToSearch(formModel, utils.tableColumns, utils.translateKey);
    reactiveForm = fmps.toFormGroup(formModel);
    
    component.formModel = formModel;
    component.formData = {};
    component.form = reactiveForm;
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

  it('should have the search fields', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[name=id]')).not.toBeNull('id field');
    expect(fixture.nativeElement.querySelector('[name=name]')).not.toBeNull('name field');
    expect(fixture.nativeElement.querySelector('[name=driver]')).not.toBeNull('driver field');
    expect(fixture.nativeElement.querySelector('[name=host]')).not.toBeNull('host field');
    expect(fixture.nativeElement.querySelector('[name=port]')).not.toBeNull('port field');
    expect(fixture.nativeElement.querySelector('[name=database]')).not.toBeNull('database field');
    expect(fixture.nativeElement.querySelector('[name=username]')).not.toBeNull('username field');
    expect(fixture.nativeElement.querySelector('[name=password]')).not.toBeNull('password field');
    expect(fixture.nativeElement.querySelector('[name=prefix]')).not.toBeNull('prefix field');
    expect(fixture.nativeElement.querySelector('[name=meta]')).not.toBeNull('meta field');
    expect(fixture.nativeElement.querySelector('[name=created_at_from]')).not.toBeNull('created_at_from field');
    expect(fixture.nativeElement.querySelector('[name=created_at_to]')).not.toBeNull('created_at_to field');
    expect(fixture.nativeElement.querySelector('[name=updated_at_from]')).not.toBeNull('updated_at_from field');
    expect(fixture.nativeElement.querySelector('[name=updated_at_to]')).not.toBeNull('updated_at_to field');
    expect(fixture.nativeElement.querySelector('[name=deleted_at_from]')).not.toBeNull('deleted_at_from field');
    expect(fixture.nativeElement.querySelector('[name=deleted_at_to]')).not.toBeNull('deleted_at_to field');
  });
});
