import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';

import { COMPONENTS, ProductListComponent } from './components';
import { DIRECTIVES } from './directives';
import { SERVICES } from './services';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent }
    ])
  ],
  declarations: [ COMPONENTS, DIRECTIVES ],
  providers: SERVICES
})
export class ProductModule {}
