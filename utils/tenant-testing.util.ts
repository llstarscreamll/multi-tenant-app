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

/**
 * Tenant Test Utils.
 *
 * @author  [name] <[<email address>]>
 */

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
export let TenantOne: Tenant = {
	"id": "a1",
	"name": "Quidem voluptas ut atque quidem quia.",
	"driver": "mysql",
	"host": "192.168.133.186",
	"port": "8664",
	"database": "qui",
	"username": "qui",
	"prefix": "tempora",
	"meta": "Voluptas accusantium nam blanditiis voluptas. Sint qui quidem et et neque ratione.",
	"created_at": "1971-09-05 07:43:37",
	"updated_at": "2005-11-05 22:11:28",
	"deleted_at": null
};
export let TenantTwo: Tenant = {
	"id": "b2",
	"name": "Architecto eum deserunt unde tempore cum quibusdam voluptatem assumenda.",
	"driver": "mysql",
	"host": "10.15.137.84",
	"port": "4391",
	"database": "veritatis",
	"username": "asperiores",
	"prefix": "molestias",
	"meta": "Odio culpa numquam aut doloribus aut voluptatibus. Quia dolores dolorem quo doloribus deserunt enim voluptatibus. Voluptatem quisquam voluptas earum voluptatum perspiciatis esse ut.",
	"created_at": "1995-10-26 18:58:20",
	"updated_at": "1996-07-04 01:39:29",
	"deleted_at": null
};
export let TenantList: Tenant[] = [
	TenantOne,
	TenantTwo,
];

export const FORM_MODEL = {
	"id": {
		"name": "id",
		"type": "text",
		"placeholder": "",
		"value": null, "min": "",
		"max": "",
		"mainWrapperClass": "col-sm-6",
		"labelClass": "",
		"controlWrapperClass": "",
		"controlClass": "",
		"break": true, "visibility": { "create": false, "details": true, "edit": false, "search": true }, "validation": ["numeric"]
	}, "name": {
		"name": "name",
		"type": "text",
		"placeholder": "",
		"value": null, "min": "",
		"max": "",
		"mainWrapperClass": "col-sm-6",
		"labelClass": "",
		"controlWrapperClass": "",
		"controlClass": "",
		"break": false, "visibility": { "create": true, "details": true, "edit": true, "search": true }, "validation": ["required",
			"string"]
	}, "driver": {
		"name": "driver",
		"type": "textarea",
		"placeholder": "",
		"value": null, "min": "",
		"max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": true, "details": true, "edit": true, "search": true }, "validation": ["required", "string"]
	}, "host": { "name": "host", "type": "textarea", "placeholder": "", "value": null, "min": "", "max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": true, "details": true, "edit": true, "search": true }, "validation": ["required", "string"] }, "port": { "name": "port", "type": "textarea", "placeholder": "", "value": null, "min": "", "max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": true, "details": true, "edit": true, "search": true }, "validation": ["required", "string"] }, "database": { "name": "database", "type": "textarea", "placeholder": "", "value": null, "min": "", "max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": true, "details": true, "edit": true, "search": true }, "validation": ["required", "string"] }, "username": { "name": "username", "type": "textarea", "placeholder": "", "value": null, "min": "", "max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": true, "details": true, "edit": true, "search": true }, "validation": ["required", "string"] }, "password": { "name": "password", "type": "textarea", "placeholder": "", "value": null, "min": "", "max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": true, "details": true, "edit": true, "search": true }, "validation": ["required", "string"] }, "prefix": { "name": "prefix", "type": "text", "placeholder": "", "value": null, "min": "", "max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": true, "details": true, "edit": true, "search": true }, "validation": ["required", "string"] }, "meta": { "name": "meta", "type": "textarea", "placeholder": "", "value": null, "min": "", "max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": true, "details": true, "edit": true, "search": true }, "validation": ["required", "string"] }, "created_at": { "name": "created_at", "type": "datetime-local", "placeholder": "", "value": null, "min": "", "max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": false, "details": true, "edit": false, "search": true }, "validation": ["date:Y-m-d H:m:s"] }, "updated_at": { "name": "updated_at", "type": "datetime-local", "placeholder": "", "value": null, "min": "", "max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": false, "details": true, "edit": false, "search": true }, "validation": ["date:Y-m-d H:m:s"] }, "deleted_at": { "name": "deleted_at", "type": "datetime-local", "placeholder": "", "value": null, "min": "", "max": "", "mainWrapperClass": "col-sm-6", "labelClass": "", "controlWrapperClass": "", "controlClass": "", "break": false, "visibility": { "create": false, "details": true, "edit": false, "search": true }, "validation": ["date:Y-m-d H:m:s"] }, "_options_": { "model": "tenant" }
};
export const FORM_DATA = {
};

// Mockbackend settings
export function setupMockBackend(mockBackend: MockBackend) {
	mockBackend.connections.subscribe((connection: MockConnection) => {
		// POST create item request
		if (connection.request.method === 1 && connection.request.url.search(/tenants/i) > -1) {
			connection.mockRespond(new Response(new ResponseOptions({
				body: JSON.stringify({ data: JSON.parse(connection.request.getBody()) }),
				status: 200,
				statusText: "OK",
			})));
			return;
		}

		// POST update 'a1' (TenantOne) item request
		if (connection.request.method === 1 && connection.request.url.search(/tenants\/a1/i) > -1) {
			connection.mockRespond(new Response(new ResponseOptions({
				body: JSON.stringify({ data: TenantOne }),
				status: 200,
				statusText: "OK",
			})));
			return;
		}

		// GET form model request
		if (connection.request.url.search(/tenants\/form-model/i) > -1) {
			connection.mockRespond(new Response(new ResponseOptions({
				body: JSON.stringify(FORM_MODEL),
				status: 200,
				statusText: "OK",
			})));
			return;
		}

		// GET form data request
		if (connection.request.url.search(/tenants\/form-data/i) > -1) {
			connection.mockRespond(new Response(new ResponseOptions({
				body: JSON.stringify(FORM_DATA),
				status: 200,
				statusText: "OK",
			})));
			return;
		}

		// GET 'a1' (TenantOne) item data request
		if (connection.request.url.search(/tenants\/a1/i) > -1) {
			connection.mockRespond(new Response(new ResponseOptions({
				body: JSON.stringify({ data: TenantOne }),
				status: 200,
				statusText: "OK",
			})));
			return;
		}

		// GET 'b2' (TenantTwo) item data request
		if (connection.request.url.search(/tenants\/b2/i) > -1) {
			connection.mockRespond(new Response(new ResponseOptions({
				body: JSON.stringify({ data: TenantTwo }),
				status: 200,
				statusText: "OK",
			})));
			return;
		}
	});
}

// Containers Testbed Imports
export const IMPORTS = [
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

export const PROVIDERS = [
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
