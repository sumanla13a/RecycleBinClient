import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addItemForm:FormGroup;
  constructor(private fb: FormBuilder) {
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
  }

  ngOnInit() {
  }

}
