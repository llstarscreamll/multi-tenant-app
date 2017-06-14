import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

import { TenantAbstractPage } from './tenant-abstract.page';

/**
 * TenantFormPage Class.
 *
 * @author  [name] <[<email address>]>
 */
@Component({
  selector: 'tenant-form-page',
  templateUrl: './tenant-form.page.html'
})
export class TenantFormPage extends TenantAbstractPage implements OnInit, OnDestroy {
  /**
   * Page title language key.
   * @type  string
   */
  protected title = 'form-page';

  /**
   * TenantFormPage constructor.
   */
  public constructor(
    protected titleService: Title,
    protected translateService: TranslateService,
    protected location: Location,
    protected activedRoute: ActivatedRoute,
  ) { super(); }

  /**
   * The component is ready, this is called after the constructor and after the
   * first ngOnChanges(). This is invoked only once when the component is
   * instantiated.
   */
  public ngOnInit() {
    this.setFormType();
    this.setDocumentTitle();
  }

  /**
   * Clean the component canceling the background taks. This is called before the
   * component instance is funally destroyed.
   */
  public ngOnDestroy() {
    this.activedRouteSubscription$ ? this.activedRouteSubscription$.unsubscribe() : null;
  }
}
