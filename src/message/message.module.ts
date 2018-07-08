import { NgModule, Component } from '@angular/core';
import { RouterModule, Route, Router } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { COMPONENTS, MessageComponent } from './components';
import { SERVICES } from './services';

const routes: Route[] = [{ component: MessageComponent, outlet: 'popup', path: 'messages' }];

@NgModule({
	imports: [SharedModule, RouterModule.forChild(routes)],
	declarations: COMPONENTS,
	providers: SERVICES
})
export class MessageModule {}
