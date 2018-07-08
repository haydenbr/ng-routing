import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent, WelcomeComponent } from './components';

const ROUTES: Routes = [
	{ path: 'welcome', component: WelcomeComponent },
	{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(ROUTES, { useHash: true, enableTracing: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
