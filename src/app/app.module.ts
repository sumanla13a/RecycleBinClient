import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { DatePickerModule } from 'ng2-datepicker';

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
import { SingleItemComponent } from './single-item/single-item.component';
import { SingleItemResolver } from './single-item/single-item.resolver';
import { AdvancedformComponent } from './advancedform/advancedform.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ItemsListComponent,
    ErrorComponent,
    AddItemComponent,
    SingleItemComponent,
    AdvancedformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RecycleBinRoutes,
    ReactiveFormsModule,
    DatePickerModule
  ],
  providers: [
    AuthService,
    ItemsService,
    ItemListResolver,
    SingleItemResolver, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [ Http, RequestOptions ]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
