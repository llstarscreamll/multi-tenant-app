import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import * as fromRoot from './../../../reducers';
import { FormModelParserService } from './../../../dynamic-form/services/form-model-parser.service';
import * as tenantActions from './../../actions/tenant.actions';

import { Tenant } from './../../models/tenant';

import { TenantAbstractComponent, SearchQuery } from './tenant-abstract.component';

/**
 * TenantSearchBasicComponent Class.
 *
 * @author  [name] <[<email address>]>
 */
@Component({
  selector: 'tenant-search-basic-component',
  templateUrl: './tenant-search-basic.component.html',
  exportAs: 'tenant-search-basic',
})
export class TenantSearchBasicComponent extends TenantAbstractComponent implements OnInit {
  @Output()
  public advancedSearchBtnClick = new EventEmitter<null>();
  
  public searchForm: FormGroup;

  public constructor(
    private fb: FormBuilder,
    protected store: Store<fromRoot.State>,
    protected translateService: TranslateService,
    protected formModelParserService: FormModelParserService,
    ) { super(); }

  public ngOnInit() {
  	this.searchForm = this.fb.group({
      search: [''],
      page: [1]
    });
  }
}
