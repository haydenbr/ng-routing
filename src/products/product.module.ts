import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { SERVICES } from './services';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ COMPONENTS, DIRECTIVES ],
  providers: SERVICES
})
export class ProductModule {}
