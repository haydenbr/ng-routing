import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../../message/services';

import { Product } from '../../models';
import { ProductService } from '../../services';

@Component({
	templateUrl: 'product-edit.component.html',
	styleUrls: ['product-edit.component.scss']
})
export class ProductEditComponent {
	pageTitle = 'Product Edit';
	errorMessage: string;

	product: Product;

	constructor(
	    private productService: ProductService,
		private messageService: MessageService
	) { }

	getProduct(id: number): void {
		this.productService.getProduct(id)
			.subscribe(
				(product: Product) => this.onProductRetrieved(product),
				(error: any) => this.errorMessage = <any>error
			);
	}

	onProductRetrieved(product: Product): void {
		this.product = product;

		if (this.product.id === 0) {
			this.pageTitle = 'Add Product';
		} else {
			this.pageTitle = `Edit Product: ${this.product.productName}`;
		}
	}

	deleteProduct(): void {
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
