import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ItemsService } from './items.service';
import { BaseUrl } from '../app.constants';
@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  uploadImageForm:FormGroup;
  BaseUrl:string;
  users: any[];
  constructor(private fb: FormBuilder, private itemSrvc: ItemsService) { 
    this.BaseUrl = BaseUrl;
  	this.uploadImageForm = fb.group({
  		img: ['', Validators.required],
  	});
  }

  ngOnInit() {
  }
}
