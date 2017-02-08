import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items-list/items.service';

@Component({
  selector: 'app-advancedform',
  templateUrl: './advancedform.component.html',
  styleUrls: ['./advancedform.component.css']
})
export class AdvancedformComponent implements OnInit {
  
  filter = {
  	name: '',	
  	from: '',
  	to: '',
  	state: '',
  	category: '',
  	city: ''
  }
  constructor(private itemSrvc: ItemsService) { }

  ngOnInit() {
  }
  filterData() {
  	let query = {
  		name: this.filter.name,
  		state: this.filter.state,
  		city: this.filter.city,
  		category: this.filter.category,
  		createdAt: {
  			$gte: new Date(this.filter.from['formatted']),
  			$lte: new Date(this.filter.to['formatted'])
  		}
  	};
  	this.itemSrvc.ensureLoaded(query);
  }

  nearMe() {

  }
}
