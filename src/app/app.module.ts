import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ItemsListComponent } from './items-list/items-list.component';

import { AuthService } from './services/auth.service';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ItemsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [ Http, RequestOptions ]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
