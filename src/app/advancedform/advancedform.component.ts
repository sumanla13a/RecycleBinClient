import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items-list/items.service';
import { AdvancedFormService } from '../advancedform/advancedform.service';

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
  constructor(private itemSrvc: ItemsService,private advanceFormSrvc:AdvancedFormService) { }

  ngOnInit() {
	  		this.getStates();
  }

  states: [any];
	getStates() {
		this.advanceFormSrvc.getStates(function (data: any) {
			this.states = data.json().states;
		}.bind(this))
	}

cities: [any];
	populateCity(state:string) {
		this.advanceFormSrvc.getCities(state, function (data: any) {
			this.cities = data.json().cities;
		}.bind(this))
	}
  filterData() {
  	type createdAt = {
  		$gte?: Date,
  		$lte?: Date
  	}
  	type queryType = {
  		name?: string,
  		city?: string,
  		state?: string,
  		createdAt?: createdAt,
  		category?: string
  	};
  	let query:queryType = {};

  	if(this.filter.state) query.state = this.filter.state;
  	if(this.filter.city) query.city = this.filter.city;
  	if(this.filter.category) query.category = this.filter.category;
  	if(this.filter.from || this.filter.to) {
  		query.createdAt= {};
  		if(this.filter.from) {
  			query.createdAt.$gte = new Date(this.filter.from['formatted']);
  		}
  		if(this.filter.to) {
  			query.createdAt.$lte = new Date(this.filter.to['formatted']);
  		}
  	}
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
