/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, inject, getTestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import * as fromRoot from './../../../reducers';
import { DynamicFormModule } from './../../../dynamic-form/dynamic-form.module';
import { FormModelParserService } from './../../../dynamic-form/services/form-model-parser.service';
import * as utils from './../../utils/tenant-testing.util';
import { ES } from './../../translations/es';

import { TenantFormFieldsComponent } from './tenant-form-fields.component';

describe('TenantFormFieldsComponent', () => {
  let fixture: ComponentFixture<TenantFormFieldsComponent>;
  let component: TenantFormFieldsComponent
  let formModel;
  let reactiveForm;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TenantFormFieldsComponent],
      imports: [
        RouterTestingModule,
        HttpModule,
        TranslateModule.forRoot(),
        DynamicFormModule,
      ],
      providers: []
    }).compileComponents();

    fixture = getTestBed().createComponent(TenantFormFieldsComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(inject([FormModelParserService], (fmps: FormModelParserService) => {
    formModel = fmps.parse(utils.FORM_MODEL);
    reactiveForm = fmps.toFormGroup(formModel);
    
    component.tenantForm = reactiveForm;
    component.tenantFormModel = formModel;
    component.tenantFormData = {};
    component.formType = 'create';
    component.errors = {};
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

  it('should have certain fields on create form', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[name=name]')).not.toBeNull('name field');
    expect(fixture.nativeElement.querySelector('[name=driver]')).not.toBeNull('driver field');
    expect(fixture.nativeElement.querySelector('[name=host]')).not.toBeNull('host field');
    expect(fixture.nativeElement.querySelector('[name=port]')).not.toBeNull('port field');
    expect(fixture.nativeElement.querySelector('[name=database]')).not.toBeNull('database field');
    expect(fixture.nativeElement.querySelector('[name=username]')).not.toBeNull('username field');
    expect(fixture.nativeElement.querySelector('[name=password]')).not.toBeNull('password field');
    expect(fixture.nativeElement.querySelector('[name=prefix]')).not.toBeNull('prefix field');
    expect(fixture.nativeElement.querySelector('[name=meta]')).not.toBeNull('meta field');
  });

  it('should have certain disabled fields on details form', () => {
    component.formType = 'details';
    fixture.detectChanges();

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
  });
});
