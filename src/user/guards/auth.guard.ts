import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanLoad,
	RouterStateSnapshot,
	Router,
	Route
} from '@angular/router';

import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.checkLoggedIn(state.url);
	}

	canLoad(route: Route) {
		return this.checkLoggedIn(route.path);
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
