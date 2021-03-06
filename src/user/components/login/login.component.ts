import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services';

@Component({
	templateUrl: 'login.component.html'
})
export class LoginComponent {
	errorMessage: string;
	pageTitle = 'Log In';

	constructor(private authService: AuthService, private router: Router) {}

	login(loginForm: NgForm) {
		if (loginForm && loginForm.valid) {
			const userName = loginForm.form.value.userName;
			const password = loginForm.form.value.password;
			this.authService.login(userName, password);

			const route = this.authService.redirectUrl || '/products';
			this.router.navigate([route]);
		} else {
			this.errorMessage = 'Please enter a user name and password.';
		}
	}

	onCancelClick() {
		this.router.navigate(['welcome']);
	}
}
