import { Component } from '@angular/core';
import {
	Router,
	Event,
	NavigationStart,
	NavigationEnd,
	NavigationError,
	NavigationCancel
} from '@angular/router';

import { AuthService } from '../user/services/auth.service';

@Component({
	selector: 'pm-app',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	pageTitle = 'Acme Product Management';
	private loading = true;

	constructor(private authService: AuthService, private router: Router) {
		this.router.events.subscribe((event) => this.checkRouterEvent(event));
	}

	checkRouterEvent(event: Event) {
		this.loading = event instanceof NavigationStart;
	}

	logOut(): void {
		this.authService.logout();
		console.log('Log out');
		this.navToHome();
	}

	onHomeClick() {
		this.navToHome();
	}

	private navToHome() {
		this.router.navigate(['welcome']);
	}

	onProductsClick() {
		this.router.navigate(['products']);
	}

	onLoginClick() {
		this.router.navigate(['login']);
	}

	onAddProductClick() {
		this.router.navigate(['products', 0, 'edit']);
	}
}
