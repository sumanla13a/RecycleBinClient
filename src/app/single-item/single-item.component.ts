import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items-list/items.service'; 

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.css']
})
export class SingleItemComponent implements OnInit {

  constructor(private itemsSrvc:ItemsService) { }

  ngOnInit() {
  }

}
