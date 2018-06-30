import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, map, switchMap, catchError } from 'rxjs/operators';

import { MessageService } from '../../../message/services';
import { Product } from '../../models';
import { ProductService } from '../../services';

@Component({
	templateUrl: 'product-edit.component.html',
	styleUrls: ['product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
	errorMessage: string;
	product: Product;
	private killSubs = new Subject();

	constructor(
	  private productService: ProductService,
		private messageService: MessageService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location
	) {}

	ngOnInit() {
		this.route.paramMap.pipe(
			takeUntil(this.killSubs),
			map(params => Number(params.get('id'))),
			switchMap(id => this.productService.getProduct(id)),
			catchError((error: any) => this.errorMessage = error)
		)
		.subscribe((product: Product) => {
			this.product = product || this.product;
		});
	}

	ngOnDestroy() {
		this.killSubs.next();
	}

	get pageTitle() {
		return this.product &&
			(this.product.id ? `Edit Product: ${this.product.productName}` : 'Add Product');
	}

	onCancelClick() {
		this.goBack();
	}

	onSaveClick() {
		this.productService
			.saveProduct(this.product)
			.subscribe(() => this.onEditComplete(`${this.product.productName} was saved`));
	}

	onDeleteClick() {
		if (this.confirmDelete()) {
			this.productService
				.deleteProduct(this.product.id)
				.subscribe(() => this.onEditComplete(`${this.product.productName} was deleted`));
		}
	}

	onEditComplete(message) {
		this.messageService.addMessage(message);
		this.goBackToProducts();
	}

	private goBack() {
		this.location.back();
	}

	private goBackToProducts() {
		this.router.navigate(['/products']);
	}

	confirmDelete() {
		return confirm(`Really delete ${this.product.productName}?`);
	}

	get canDelete() {
		return this.product && this.product.id && this.product.id !== 0;
	}

	deleteProductBob(): void {
		if (this.product.id === 0) {
			// Don't delete, it was never saved.
			this.onSaveComplete();
	   } else {
			if (confirm(`Really delete the product: ${this.product.productName}?`)) {
				this.productService.deleteProduct(this.product.id)
					.subscribe(
						() => this.onSaveComplete(`${this.product.productName} was deleted`),
						(error: any) => this.errorMessage = <any>error
					);
			}
		}
	}

	saveProduct(): void {
		if (true === true) {
			this.productService.saveProduct(this.product)
				.subscribe(
					() => this.onSaveComplete(`${this.product.productName} was saved`),
					(error: any) => this.errorMessage = <any>error
				);
		} else {
			this.errorMessage = 'Please correct the validation errors.';
		}
	}

	onSaveComplete(message?: string): void {
		if (message) {
			this.messageService.addMessage(message);
		}

		// Navigate back to the product list
	}
}
