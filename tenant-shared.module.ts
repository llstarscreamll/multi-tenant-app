import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { DynamicFormModule } from './../dynamic-form/dynamic-form.module';
import { COMPONENTS } from './components';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    TranslateModule,
    DynamicFormModule,
  ],
  declarations: [
    COMPONENTS
  ],
  exports: [
    COMPONENTS
  ]
})
export class TenantSharedModule { }
