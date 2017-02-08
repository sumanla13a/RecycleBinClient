import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ItemsService } from '../items-list/items.service';
import { AddItemService } from '../add-item/add-item.service';


@Component({
	selector: 'app-add-item',
	templateUrl: './add-item.component.html',
	styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
	addItemForm: FormGroup;
	constructor(private fb: FormBuilder, private itemSrvc: ItemsService, private addItmSrvc: AddItemService) {
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
			state: ['', Validators.required],
			city: ['', Validators.required]
		});
	}

	submit() {
		console.log(this.addItemForm.value);
		this.itemSrvc.postForm(this.addItemForm.value);
	}

<<<<<<< c13673d9b9ddaf4941aaa59ea3a4b4f5050eef02
	ngOnInit() {
		this.getStates();
	}
=======
  submit() {
    this.itemSrvc.postForm(this.addItemForm.value);
  }
>>>>>>> implements search

	states: [any];
	getStates() {
		this.addItmSrvc.getStates(function (data: any) {
			this.states = data.json().states;
		}.bind(this))
	}

	cities: [any];
	populateCity(state:string) {
		this.addItmSrvc.getCities(state, function (data: any) {
			console.log(data.json().cities);
			this.cities = data.json().cities;
		}.bind(this))
	}
}
