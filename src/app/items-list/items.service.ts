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
	_id?: string,
	name: string,
	description?: string,
	details?: string,
	contact: contacts,
	category: string,
	state: string,
	city: string,
	coords: number[],
	img?: string,
	createdAt?: Date,
	updatedAt?: Date,
  deleted?: boolean
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
  loadMore:boolean;
  querySaved:any;
  loadMore() {
    this.querySaved.skip = this.listItems.length;
    this.loadMore = true;
    this.ensureLoaded(this.querySaved);
  }

  ensureLoaded(query?:any) {

  	query = query || {};

	if(!query.skip) {
		query.skip = 0;
	}
	if(!query.limit) {
		query.limit = 10;
	}
  this.querySaved = query;
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
            if(this.listItems.length && this.loadMore) {
              res.json().data.forEach(e => this.listItems.push(e));
              this.loadMore = false;
            } else {
	  				  this.listItems = res.json().data;
            }
	  				resolve(res);
	  			},
	  			reject,
	  			() => this.defer.queried = false
			);
  		});
  	}

	return this.defer.promise;
  }

  postForm(data:any) {
	this.defer = new Promise((resolve, reject) => {
		this.authHttp.post(BaseUrl + '/items', data).subscribe(
			//res => this.router.navigate(['/home'])
			res =>{ 
				this.router.navigate(['items/add/upload'],{queryParams:{id:res.json().data._id}})}
		);
	});
  }

  getById(id:string) {
  	let item;
  	if(this.listItems && this.listItems.length) {
  		console.log('here');
  		item = this.listItems.find(it => it._id === id);
  	}
  	if(!item) {
  		return new Promise((resolve, reject) => {
  			this.authHttp.get(BaseUrl + '/items/' + id).subscribe(
  				res => {
  					this.currentItem = res.json().data
  					resolve(this.currentItem);
  				},
  				reject
			  );
  		})
  	} else {
  		this.currentItem = item;
  		return Promise.resolve(item);
  	}
  }

  deleteCurrent() {
    return new Promise((resolve, reject) => {
      this.currentItem.deleted = true;
      this.authHttp.post(BaseUrl + '/items/' + this.currentItem._id + '/delete', this.currentItem).subscribe(
        res => {
          this.currentItem = res.json().data
          resolve(this.currentItem);
        },
        reject
      );
    });
  }
}
