import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { SharedModule } from '../shared';

import {
	COMPONENTS,
	ProductListComponent,
	ProductDetailComponent,
	ProductEditComponent,
	ProductEditInfoComponent,
	ProductEditTagsComponent
} from './components';
import { DIRECTIVES } from './directives';
import { SERVICES, ProductResolverService } from './services';

const routes: Route[] = [
	{ path: 'products', component: ProductListComponent, data: { pageTitle: 'Product List' } },
	{
		path: 'products/:id',
		component: ProductDetailComponent,
		resolve: { product: ProductResolverService }
	},
	{
		path: 'products/:id/edit',
		component: ProductEditComponent,
		resolve: { product: ProductResolverService }
	}
];

@NgModule({
	imports: [SharedModule, RouterModule.forChild(routes)],
	declarations: [COMPONENTS, DIRECTIVES],
	providers: SERVICES
})
export class ProductModule {}
