import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { COMPONENTS } from './components';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

/* Feature Modules */
import { ProductModule } from '../product';
import { MessageModule } from '../message';
import { UserModule } from '../user';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ], { useHash: true }),
    HttpModule,
    SharedModule,
    ProductModule,
    UserModule,
    MessageModule,
  ],
  declarations: [ AppComponent, COMPONENTS ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
