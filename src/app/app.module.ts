import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { COMPONENTS } from './components';
import { AppRoutingModule } from './app-routing.module';

import { ProductModule } from '../product';
import { MessageModule } from '../message';
import { UserModule } from '../user';
import { SharedModule } from '../shared';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		SharedModule,
		ProductModule,
		UserModule,
		MessageModule,
		AppRoutingModule
	],
	declarations: [AppComponent, COMPONENTS],
	bootstrap: [AppComponent]
})
export class AppModule {}
