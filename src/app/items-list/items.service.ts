import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

import { BaseUrl } from '../app.constants';
export type contacts = {
	email: string,
	phone?: string
}

export type items = {
	name: string,
	description?: string,
	details?: string,
	contact: contacts,
	state: string,
	city: string,
	coords: number[],
	img?: string,
	createdAt?: Date,
	updatedAt?: Date
}

@Injectable()
export class ItemsService {

  constructor(private http: Http, private authHttp: AuthHttp, private router: Router) { }

  listItems:items[];
  currentItem: items;

  queried:boolean;
  defer:any = {
  	queried: false
  };

  ensureLoaded(query?:any) {

  	query = query || {};
	if(!query.skip) {
		query.skip = 0;
	}
	if(!query.limit) {
		query.limit = 10;
	}

	let params: URLSearchParams = new URLSearchParams();
	for(let key in query){
		params.set('query', JSON.stringify(query));
	}

  	if(!this.defer.queried) {
  		this.defer.queried=true;
  		this.defer.promise = new Promise((resolve, reject) => {
  			this.http.get(BaseUrl + '/items', {
  				'search': params
  			})
  			.subscribe(
	  			res => {
	  				this.listItems = res.json().data;
	  				resolve(res);
	  			},
	  			err => reject(err),
	  			() => this.defer.queried = false
			);
  		});
  	}

	return this.defer.promise;
  }

  postForm(data:any) {
	this.defer = new Promise((resolve, reject) => {
		this.authHttp.post(BaseUrl + '/items', data).subscribe(
			res => this.router.navigate(['/home'])
		);
	});
  }
}
