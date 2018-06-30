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
	pageTitle = 'Product Edit';
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
		this.route.params.pipe(
			takeUntil(this.killSubs),
			map(params => Number(params.id)),
			switchMap(id => this.productService.getProduct(id)),
			catchError((error: any) => this.errorMessage = error)
		)
		.subscribe((product: Product) => {
			this.product = product || this.product;
			this.setPageTitle(this.product.id);
		});
	}

	ngOnDestroy() {
		this.killSubs.next();
	}

	setPageTitle(productId: number): void {
		if (productId === 0) {
			this.pageTitle = 'Add Product';
		} else {
			this.pageTitle = `Edit Product: ${this.product.productName}`;
		}
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
