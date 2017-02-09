import { Component, OnInit } from '@angular/core';
import { BaseUrl } from '../app.constants';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  BaseUrl:string = BaseUrl;
  constructor() { }

  ngOnInit() {
  }

}
