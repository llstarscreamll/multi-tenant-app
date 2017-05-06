/* tslint:disable:no-unused-variable */
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { Store, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { environment } from './../../../environments/environment';
import { CoreModule } from './../../core/core.module';
import { DynamicFormModule } from './../../dynamic-form/dynamic-form.module';
import * as fromRoot from './../../reducers';
import { AuthGuard } from './../../auth/guards/auth.guard';
import { AuthService } from './../../auth/services/auth.service';

import { Tenant } from './../models/tenant';
import { EFFECTS } from './../effects/';
import { SERVICES } from './../services';

export const FORM_MODEL = {"id":{"name":"id","type":"text","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":true,"visibility":{"create":false,"details":true,"edit":false,"search":true},"validation":["numeric"]},"name":{"name":"name","type":"text","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true},"validation":["required","string"]},"driver":{"name":"driver","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true},"validation":["required","string"]},"host":{"name":"host","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true},"validation":["required","string"]},"port":{"name":"port","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true},"validation":["required","string"]},"database":{"name":"database","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true},"validation":["required","string"]},"username":{"name":"username","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true},"validation":["required","string"]},"password":{"name":"password","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true},"validation":["required","string"]},"prefix":{"name":"prefix","type":"text","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true},"validation":["required","string"]},"meta":{"name":"meta","type":"textarea","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":true,"details":true,"edit":true,"search":true},"validation":["required","string"]},"created_at":{"name":"created_at","type":"datetime-local","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":false,"details":true,"edit":false,"search":true},"validation":["date:Y-m-d H:m:s"]},"updated_at":{"name":"updated_at","type":"datetime-local","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":false,"details":true,"edit":false,"search":true},"validation":["date:Y-m-d H:m:s"]},"deleted_at":{"name":"deleted_at","type":"datetime-local","placeholder":"","value":null,"min":"","max":"","mainWrapperClass":"col-sm-6","labelClass":"","controlWrapperClass":"","controlClass":"","break":false,"visibility":{"create":false,"details":true,"edit":false,"search":true},"validation":["date:Y-m-d H:m:s"]},"_options_":{"model":"tenant"}};

export let translateKey: string = 'TENANT.';
export let tableColumns = [
  'tenants.id',
  'tenants.name',
  'tenants.driver',
  'tenants.host',
  'tenants.port',
  'tenants.database',
  'tenants.username',
  'tenants.password',
  'tenants.prefix',
  'tenants.meta',
  'tenants.created_at',
  'tenants.updated_at',
  'tenants.deleted_at',
];

// Testing Models
export let TenantOne: Tenant = {"id":"a1","name":"Hic sit magnam et asperiores.","driver":"Suscipit iusto ea ut quia vel. Voluptas reprehenderit sapiente aperiam dolorem veritatis fugit est. Magnam et dolorem voluptatum nobis numquam pariatur.","host":"Amet voluptas laboriosam expedita quos aperiam culpa. Qui quia consequatur vel ut quos rerum. Omnis rerum repellat sit cupiditate dolores ipsa impedit.","port":"Aut explicabo ut et eligendi voluptas eum. Quae consequatur qui quia. Pariatur omnis nam natus sunt est distinctio. Temporibus sed ut eius libero veniam. Minima ut ullam cum quis velit itaque.","database":"Sed quia adipisci facilis qui aut laboriosam vero. Aperiam aperiam aut sint et vel. Pariatur qui necessitatibus ea rerum quasi facere in.","username":"Magnam voluptate blanditiis autem qui tenetur. Quae nesciunt accusamus velit quam ipsum. Non dolorem eos repellat nemo aliquid et odio.","password":"Sit atque quo sunt eveniet. Qui reprehenderit nemo eaque voluptates eum magnam.","prefix":"Delectus fuga impedit quas.","meta":["Porro est dicta dolore natus dicta. Quae consequatur enim dolor adipisci. Amet voluptatem molestias ratione modi."],"created_at":"1994-03-29 14:45:54","updated_at":"1983-07-12 13:53:38","deleted_at":null};
export let TenantTwo: Tenant = {"id":"b2","name":"Eum autem alias aut culpa consequatur.","driver":"In repudiandae id molestias voluptas. Recusandae deleniti voluptates nihil perspiciatis. Repellat est dolor laboriosam. Occaecati voluptas iste quasi enim.","host":"Vel facere quis et ab fuga ut. Ut non modi voluptatem maxime tenetur. Quis molestias enim et officiis dignissimos est.","port":"Blanditiis officiis quia voluptatem in non omnis non. Quia cupiditate recusandae rerum rem occaecati.","database":"Cum facere amet quasi. Voluptas molestiae omnis tempore. Est qui veritatis nesciunt cum consequatur et. Ex tempore sunt laudantium id.","username":"Rerum autem et ut rerum at necessitatibus repudiandae. In qui temporibus id suscipit. Deleniti aspernatur sit deserunt corporis veniam nihil. Nam consectetur omnis libero quod sit labore.","password":"Molestias optio provident nesciunt ducimus nobis. Ut eum voluptas porro reprehenderit nulla non. Qui ut quo aliquid praesentium sed.","prefix":"Voluptatum sit velit voluptatem ipsum.","meta":["Officiis aut dolorem possimus ut dolorum qui. Est eaque voluptate tempore deserunt aut non vel. Nostrum error enim beatae accusamus molestiae eaque."],"created_at":"2000-09-03 08:31:50","updated_at":"1990-11-19 13:18:23","deleted_at":null};
export let TenantList: Tenant[] = [
	TenantOne,
	TenantTwo,
];

// Mockbackend settings
export function setupMockBackend(mockBackend: MockBackend) {
	mockBackend.connections.subscribe((connection: MockConnection) => {
	  if (connection.request.url.search(/tenants\/form-model/i) > -1) {
	    connection.mockRespond(new Response(new ResponseOptions({
	      body: JSON.stringify(FORM_MODEL),
	      status: 200,
	      statusText: "OK",
	    })));
	    return;
	  }

	  if (connection.request.url.search(/tenants\/a1/i) > -1) {
	    connection.mockRespond(new Response(new ResponseOptions({
	      body: JSON.stringify({data: TenantOne}),
	      status: 200,
	      statusText: "OK",
	    })));
	    return;
	  }

	  if (connection.request.url.search(/tenants\/b2/i) > -1) {
	    connection.mockRespond(new Response(new ResponseOptions({
	      body: JSON.stringify({data: TenantTwo}),
	      status: 200,
	      statusText: "OK",
	    })));
	    return;
	  }
	});
}

// Containers Testbed Imports
export const CONTAINERS_IMPORTS = [
	RouterTestingModule,
  HttpModule,
  StoreModule.provideStore(fromRoot.reducer),
  ...EFFECTS,
  TranslateModule.forRoot(),
  CoreModule,
  environment.theme,
  ReactiveFormsModule,
  Ng2BootstrapModule.forRoot(),
  DynamicFormModule,
];

export const CONTAINERS_PROVIDERS = [
	MockBackend,
  BaseRequestOptions,
  AuthGuard,
  AuthService,
  {
    provide: Http,
    useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
    deps: [MockBackend, BaseRequestOptions]
  },
  { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'id': TenantOne.id }]) } },
  ...SERVICES,
];
