import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items-list/items.service'; 
import { BaseUrl } from '../app.constants';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {
  BaseUrl:string;
  constructor(private itemsSrvc:ItemsService) { 
    this.BaseUrl = BaseUrl;
  }

  ngOnInit() {
  }

}
