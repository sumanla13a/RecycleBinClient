import { Injectable, NgZone } from '@angular/core';
import { AuthoId, AuthoUrl } from '../app.constants';
import { tokenNotExpired } from 'angular2-jwt';
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

	lock = new Auth0Lock(AuthoId, AuthoUrl);

	constructor(private ngZ:NgZone) {
	}
	public login() {
			this.lock.show((error: string, profile: Object, id_token: string) => {
				if (error) {
					console.log(error);
				}
				// We get a profile object for the user from Auth0
				localStorage.setItem('profile', JSON.stringify(profile));
				// We also get the user's JWT
				localStorage.setItem('id_token', id_token);
				// triggering change detection cycle
				this.ngZ.run(()=>console.log('set'));
			});
	}

	public authenticated() {
		return tokenNotExpired();
	}

	public logout() {
		localStorage.removeItem('profile');
		localStorage.removeItem('id_token');
	}

}
