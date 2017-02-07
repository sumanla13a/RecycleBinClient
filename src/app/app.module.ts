import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ItemsListComponent } from './items-list/items-list.component';

import { AuthService } from './services/auth.service';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

import { ItemsService } from './items-list/items.service';
import { ErrorComponent } from './error/error.component';

import { RecycleBinRoutes } from './app.routes';

import { ItemListResolver } from './items-list/items.resolver';
import { AddItemComponent } from './add-item/add-item.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ItemsListComponent,
    ErrorComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RecycleBinRoutes,
    ReactiveFormsModule
  ],
  providers: [AuthService, ItemsService, ItemListResolver, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [ Http, RequestOptions ]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
