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
  location:any[];
  constructor(private itemSrvc: ItemsService) { }

  ngOnInit() {
  }
  filterData() {
  	let query = {
  		// name: this.filter.name,
  		state: this.filter.state,
  		city: this.filter.city,
  		category: this.filter.category,
  		createdAt: {
  			$gte: new Date(this.filter.from['formatted']),
  			$lte: new Date(this.filter.to['formatted'])
  		}
  	};
  	if(this.filter.name) {
  		query["$text"] = {
  		 	$search : this.filter.name
  		};
  	}
  	if(this.location && this.location.length) {
  		query["coords.coordinates"] ={
  			"$geoWithin": {
  				"$centerSphere":[ this.location, 1000000000 ]
  			}
  		}
  	}
  	this.itemSrvc.ensureLoaded(query);
  }

  nearMe() {
	navigator.geolocation.getCurrentPosition(
		position => {
			this.location = [position.coords.longitude, position.coords.latitude]
			this.filterData();
		}, console.log
	);
  }
}
