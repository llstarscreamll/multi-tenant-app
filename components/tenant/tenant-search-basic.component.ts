import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Tenant } from './../../models/tenant';

@Component({
  selector: 'tenant-search-basic-component',
  templateUrl: './tenant-search-basic.component.html',
  styleUrls: ['./tenant-search-basic.component.css']
})
export class TenantSearchBasicComponent implements OnInit {
  @Output()
  public search = new EventEmitter<{}>();

  @Output()
  public filterBtnClick = new EventEmitter<null>();
  
  public searchForm: FormGroup;

  public constructor(private fb: FormBuilder) { }

  public ngOnInit() {
  	this.searchForm = this.fb.group({
      search: [''],
      page: [1]
    });
  }
}
