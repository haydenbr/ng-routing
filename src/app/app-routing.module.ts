import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { PageNotFoundComponent, WelcomeComponent } from './components';
import { AuthGuard } from '../user/guards';
import { CustomPreloadingStrategyService } from './custom-preloading-strategy.service';

const ROUTES: Routes = [
	{ path: 'welcome', component: WelcomeComponent },
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{
		path: 'products',
		canActivate: [AuthGuard],
		loadChildren: '../product/product.module#ProductModule',
		data: { preload: true }
	},
	{ path: '**', component: PageNotFoundComponent }
];

const routingConfig: ExtraOptions = {
	useHash: true,
	enableTracing: true,
	preloadingStrategy: CustomPreloadingStrategyService
};

@NgModule({
	imports: [RouterModule.forRoot(ROUTES, routingConfig)],
	exports: [RouterModule],
	providers: [CustomPreloadingStrategyService]
})
export class AppRoutingModule {}
