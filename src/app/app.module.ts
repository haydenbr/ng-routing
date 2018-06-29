import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from '../products/models/product-data';

import { AppComponent } from './app.component';
import { COMPONENTS } from './components';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

/* Feature Modules */
import { ProductModule } from '../products';
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
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    SharedModule,
    ProductModule,
    UserModule,
    MessageModule
  ],
  declarations: [ AppComponent, COMPONENTS ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
