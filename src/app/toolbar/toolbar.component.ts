import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BaseUrl } from '../app.constants';
import { ItemsService } from '../items-list/items.service';
@Component({
  selector: 'toolbar',
  templateUrl: `./toolbar.component.html`,
  styleUrls: [`./toolbar.component.css`],
  providers:[AuthService]
})
export class ToolbarComponent {
    BaseUrl:string = BaseUrl;
  constructor(public auth: AuthService, public itemSrc: ItemsService) {}
  login() {
    this.auth.login();
  }
  logout() {
    this.auth.logout();
  }

  donatedByMe() {
    console.log(this.auth.currentUser);
    // this.auth.currentUser
    let query = {
      fbId: this.auth.currentUser['user_id']
    }
    this.itemSrc.ensureLoaded(query);
  }
}
