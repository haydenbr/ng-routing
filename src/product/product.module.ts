import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { SharedModule } from '../shared';

import { COMPONENTS, ProductEditInfoComponent, ProductEditTagsComponent } from './components';
import {
	CONTAINERS,
	ProductDetailComponent,
	ProductEditComponent,
	ProductListComponent
} from './containers';
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
		resolve: { product: ProductResolverService },
		children: [
			{ path: '', redirectTo: 'info', pathMatch: 'full' },
			{ path: 'info', component: ProductEditInfoComponent },
			{ path: 'tags', component: ProductEditTagsComponent }
		]
	}
];

@NgModule({
	imports: [SharedModule, RouterModule.forChild(routes)],
	declarations: [COMPONENTS, CONTAINERS, DIRECTIVES],
	providers: SERVICES
})
export class ProductModule {}
