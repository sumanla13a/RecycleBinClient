import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ItemsListComponent } from './items-list/items-list.component';

import { AuthService } from './services/auth.service';
import { AUTH_PROVIDERS } from 'angular2-jwt';
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
  providers: [AuthService, AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
