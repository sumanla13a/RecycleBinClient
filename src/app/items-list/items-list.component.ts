import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  users: any[];
  constructor(private itemSrvc: ItemsService) { }

  ngOnInit() {
  }
}
