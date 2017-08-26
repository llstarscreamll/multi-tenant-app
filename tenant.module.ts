import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { CoreSharedModule } from './../core/core.shared.module';
import { THEME } from './../themes';

import { PAGES } from './pages';
import { COMPONENTS } from './components';
import { EFFECTS } from './effects';
import { SERVICES } from './services';
import { ES } from './translations/es';
import { TenantRoutingModule } from './tenant-routing.module';

/**
 * TenantModule Class.
 *
 * @author  [name] <[<email address>]>
 */
@NgModule({
  imports: [
    FormsModule,
    THEME.default,
    CoreSharedModule,
    TenantRoutingModule,
    ...EFFECTS,
  ],
  declarations: [
    ...COMPONENTS,
    ...PAGES,
  ],
  providers: [
    ...SERVICES,
  ]
})
export class TenantModule {

  public constructor(translate: TranslateService) {
    translate.setTranslation('es', ES, true);
  }

}
