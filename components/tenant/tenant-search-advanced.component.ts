import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormModelParserService } from './../../../dynamic-form/services/form-model-parser.service';
import { Tenant } from './../../models/tenant';

@Component({
  selector: 'tenant-search-advanced-component',
  templateUrl: './tenant-search-advanced.component.html',
  styleUrls: ['./tenant-search-advanced.component.css']
})
export class TenantSearchAdvancedComponent implements OnInit {
  @Input()
  public formModel: any;

  @Input()
  public formData: any;

  @Input()
  public form: FormGroup;

  @Input()
  public errors: Object = {};

  @Input()
  public debug: boolean = false;

  @Output()
  public search = new EventEmitter<null>();
  
  public constructor() { }

  public ngOnInit() { }
}
