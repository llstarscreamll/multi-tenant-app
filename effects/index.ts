import { EffectsModule } from '@ngrx/effects';
import { TenantEffects } from './tenant.effects';

export const EFFECTS = [
  EffectsModule.run(TenantEffects),
];
