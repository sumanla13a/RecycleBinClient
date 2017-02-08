import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ItemsService } from './items.service';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  uploadImageForm:FormGroup;
  users: any[];
  constructor(private fb: FormBuilder, private itemSrvc: ItemsService) { 
  	this.uploadImageForm = fb.group({
  		img: ['', Validators.required],
  	});
  }

  ngOnInit() {
  }
}
