import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Tenant } from './../../models/tenant';

@Component({
  selector: 'tenant-form-fields-component',
  templateUrl: './tenant-form-fields.component.html',
  styleUrls: ['./tenant-form-fields.component.css']
})
export class TenantFormFieldsComponent implements OnInit {
  @Input()
  public tenantForm: FormGroup;
	
	@Input()
	public tenantFormModel: Object;

  @Input()
  public tenantFormData: Object;

  @Input()
  public errors: Object;

  @Input()
  public formType: string = 'create';

  constructor() { }

  ngOnInit() { }
}
