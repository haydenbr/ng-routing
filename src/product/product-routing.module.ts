import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ProductEditInfoComponent, ProductEditTagsComponent } from './components';
import { ProductDetailComponent, ProductEditComponent, ProductListComponent } from './containers';
import { ProductResolverService } from './services';

const routes: Route[] = [
	{
		path: '',
		component: ProductListComponent,
		data: { pageTitle: 'Product List' }
	},
	{
		path: ':id',
		component: ProductDetailComponent,
		resolve: { product: ProductResolverService }
	},
	{
		path: ':id/edit',
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
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductRoutingModule {}
