import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { TenantAbstractPage, SearchQuery } from './tenant-abstract.page';

/**
 * ListAndSearchTenantsPage Class.
 *
 * @author  [name] <[<email address>]>
 */
@Component({
  selector: 'list-and-search-tenants-page',
  templateUrl: './list-and-search-tenants.page.html',
})
export class ListAndSearchTenantsPage extends TenantAbstractPage implements OnInit {
  /**
   * Page title.
   * @type  string
   */
  protected title: string = 'module-name-plural';

  /**
   * Flag that tell as if the advanced search form should be shown or not.
   * @type  boolean
   */
  public showAdvancedSearchForm: boolean = false;
  
  /**
   * ListAndSearchTenantsPage constructor.
   */
  public constructor(
    protected location: Location,
    protected titleService: Title,
    protected translateService: TranslateService,
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
}
