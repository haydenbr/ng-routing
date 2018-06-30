import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';

import { COMPONENTS, ProductListComponent, ProductDetailComponent, ProductEditComponent } from './components';
import { DIRECTIVES } from './directives';
import { SERVICES } from './services';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'products/:id/edit', component: ProductEditComponent },
    ])
  ],
  declarations: [ COMPONENTS, DIRECTIVES ],
  providers: SERVICES
})
export class ProductModule {}
