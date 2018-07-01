import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Product } from '../../models';
import { ProductService } from '../../services';

@Component({
	templateUrl: 'product-list.component.html',
	styleUrls: ['product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
	pageTitle: string;
	imageWidth = 50;
	imageMargin = 2;
	showImage = false;
	searchTerm: string;
	errorMessage: string;
	products: Product[];
	searchTermFormControl = new FormControl();
	killSubs = new Subject();

	constructor(
		private location: Location,
		private productService: ProductService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.pageTitle = this.route.snapshot.data.pageTitle;
		this.getProducts();
		this.initForControls();
	}

	ngOnDestroy() {
		this.killSubs.next();
	}

	getProducts() {
		this.productService
			.getProducts()
			.subscribe(
				(products) => (this.products = products),
				(error) => (this.errorMessage = <any>error)
			);
	}

	initForControls() {
		this.searchTermFormControl.valueChanges
			.pipe(takeUntil(this.killSubs))
			.subscribe((value) => (this.searchTerm = value));
	}

	onProductClick(product: Product) {
		this.router.navigate(['products', product.id]);
	}

	onEditClick(product: Product) {
		this.router.navigate(['products', product.id, 'edit']);
	}

	toggleImage(): void {
		this.showImage = !this.showImage;
	}
}
