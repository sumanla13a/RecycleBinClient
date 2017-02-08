import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
 
@Injectable()
export class AddItemCanActivate implements CanActivate {
	constructor (private auth: AuthService, private router: Router) {}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
		if (this.auth.authenticated()) return true;
		else {
			this.router.navigate(['404']);
		}
	}
}
