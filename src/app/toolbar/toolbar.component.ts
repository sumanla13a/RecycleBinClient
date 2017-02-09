import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BaseUrl } from '../app.constants';
@Component({
  selector: 'toolbar',
  templateUrl: `./toolbar.component.html`,
  styleUrls: [`./toolbar.component.css`],
  providers:[AuthService]
})
export class ToolbarComponent {
    BaseUrl:string = BaseUrl;
  constructor(public auth: AuthService) {}
  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
}
