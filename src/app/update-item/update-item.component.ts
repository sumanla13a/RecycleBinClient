import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ItemsService } from '../items-list/items.service';
import { AddItemService } from '../add-item/add-item.service';
import { AuthService } from '../services/auth.service'; 
import { Ng2MapComponent } from 'ng2-map';

Ng2MapComponent['apiUrl'] = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC9KSi-1KtZY0J8xFZp_i23nd6tXyiYy84&libraries=visualization,places";

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  addItemForm: FormGroup;
	states: [any];
	cities: [any];
	positions = [];
	state:string;
	city:string;
	coords:any;
	constructor(private fb: FormBuilder, private itemSrvc: ItemsService, private addItmSrvc: AddItemService, private auth: AuthService, private ref: ChangeDetectorRef) {
		this.addItemForm = fb.group({
			name: ['', Validators.required],
			description: [''],
			details: [''],
			contact: fb.group({
				email: ['', [
					Validators.required,
					Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]
				],
				phone: ['']
			}),
			category: ['', Validators.required],
			location: ['', Validators.required]
		});
		let current = this.itemSrvc.currentItem;
		this.addItemForm.patchValue(current);	
		console.log(this.itemSrvc.currentItem);
	}

	ngOnInit() {
		// this.getStates();
	}
	submit() {
		let data:Object = this.addItemForm.value;
		data['fbId'] = this.auth.currentUser['user_id'];
		data['city'] = this.city;
		data['state'] = this.state;
		data['coords'] = this.coords;
		this.itemSrvc.postForm(this.addItemForm.value);
	}

	autocomplete: google.maps.places.Autocomplete;
  	address: any = {};


  	initialized(autocomplete: any) {
    	this.autocomplete = autocomplete;
  	}
  	placeChanged() {

    	let place = this.autocomplete.getPlace();

    	for (var i = 0; i < place.address_components.length; i++) {
      		var addressType = place.address_components[i].types[0];
      		this.address[addressType] = place.address_components[i].long_name;
    	}
    	for (var ac = 0; ac < place.address_components.length; ac++) {
		    var component = place.address_components[ac];

		    switch(component.types[0]) {
		        case 'locality':
		            this.city = component.long_name.toUpperCase();
		            break;
		        case 'administrative_area_level_1':
		            this.state = component.short_name.toUpperCase();
		            break;
		    }
		};
    	this.coords = {
    		coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
    	};
    	this.ref.detectChanges();
  	}

  	delete() {
  		console.log('deleted');
  		this.itemSrvc.deleteCurrent()/*.then(res => this.router.navigate['items'])*/;
  	}
}
