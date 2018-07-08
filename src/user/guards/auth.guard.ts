import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.checkLoggedIn(state.url);
	}

	checkLoggedIn(url: string) {
		if (this.authService.isLoggedIn()) {
			return true;
		} else {
			this.router.navigate(['login']);
			this.authService.redirectUrl = url;
			return false;
		}
	}
}
