# Tenant Angular 2+ Module

This angular module is a client for the [Tenant](https://github.com/llstarscreamll/tenant-api) apiato container and a feature module for [Hello-Angular](https://github.com/llstarscreamll/Hello-Angular).

## Install

From the root *Hello-Angular* folder:

```bash
npm i --save @ngx-translate/core
npm i --save ngx-bootstrap
git clone https://github.com/llstarscreamll/tenant-ng src/app/tenant
```

Now copy the commented store selectors located at the end of `reducers/tenant.reducer.ts` file on the main `src/app/reducers.ts` file, then register this module on the main `src/app/modules.ts` file.

## Features

- Create tenants
- Update tenants
- See tenants details
- List and search tenants

## Tests

This modules has some tests:

```bash
ng test
```
