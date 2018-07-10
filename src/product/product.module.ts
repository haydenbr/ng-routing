import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { SharedModule } from '../shared';

import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { DIRECTIVES } from './directives';
import { SERVICES } from './services';

import { ProductRoutingModule } from './product-routing.module';

@NgModule({
	imports: [SharedModule, ProductRoutingModule],
	declarations: [COMPONENTS, CONTAINERS, DIRECTIVES],
	providers: SERVICES
})
export class ProductModule {}
