import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'toolbar',
  templateUrl: `./toolbar.component.html`,
  providers:[AuthService]
})
export class ToolbarComponent {
  constructor(public auth: AuthService) {}
  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
}
