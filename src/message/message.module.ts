import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { COMPONENTS } from './components';
import { SERVICES } from './services';

@NgModule({
	imports: [SharedModule],
	declarations: COMPONENTS,
	providers: SERVICES
})
export class MessageModule {}
