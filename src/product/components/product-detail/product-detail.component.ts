import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { catchError, map, takeUntil, switchMap } from 'rxjs/operators';

import { Product } from '../../models';
import { ProductService } from '../../services';

@Component({
  templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;
  private killSubs = new Subject();

  constructor(
		private location: Location,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.pipe(
			takeUntil(this.killSubs),
			map(params => Number(params.id)),
			switchMap(id => this.productService.getProduct(id)),
			catchError((error: any) => this.errorMessage = error)
		)
		.subscribe((product: Product) => this.product = product || this.product);
  }

  ngOnDestroy() {
    this.killSubs.next();
	}

	onBackClick() {
		this.location.back();
	}

  onEditClick() {
    this.router.navigate(['/products', this.product.id, 'edit']);
  }
}
