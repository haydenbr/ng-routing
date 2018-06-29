import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { SharedModule } from '../shared';

import { COMPONENTS, ProductListComponent } from './components';
import { DIRECTIVES } from './directives';
import { ProductData } from './models';
import { SERVICES } from './services';

@NgModule({
  imports: [
    InMemoryWebApiModule.forFeature(ProductData, { delay: 1000 }),
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent }
    ])
  ],
  declarations: [ COMPONENTS, DIRECTIVES ],
  providers: SERVICES
})
export class ProductModule {}
