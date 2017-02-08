import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BaseUrl } from '../app.constants';


@Injectable()
export class AddItemService {

    constructor(public http: Http) { }

    getStates(callback): void {
        this.http.request(BaseUrl + '/zips/getStates').subscribe(
            (result: Response) => {
                callback(result)
            }
        )
    }
}