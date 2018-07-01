import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { COMPONENTS, LoginComponent } from './components';
import { SERVICES } from './services';

@NgModule({
	imports: [SharedModule, RouterModule.forChild([{ path: 'login', component: LoginComponent }])],
	declarations: COMPONENTS,
	providers: SERVICES
})
export class UserModule {}
