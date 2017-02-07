import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, URLSearchParams } from '@angular/http';

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

  constructor(private http: Http) { }

  listItems:items[];
  currentItem: item;

  defer:Observable<any> | Promise<any>;
  ensureLoaded(query?:any, force?:any) {

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
	if(!force) {
		return Promise.resolve(this.listItems);
	}
  	if(!this.defer) {

  		this.defer = new Promise((resolve, reject) => {
  			this.http.get(BaseUrl + '/items', {
  				'search': params
  			}).map(res => res.json())
  			.subscribe(
	  			res => {
	  				this.listItems = res;
	  				resolve(res);
	  			},
	  			err => reject(err),
	  			() => delete this.defer
			);
  		});
  	}

	return this.defer;
  }
}
