import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Product } from '../../models';
import { ProductService } from '../../services';

@Component({
  templateUrl: 'product-list.component.html',
  styleUrls: ['product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  searchTerm: string;
  errorMessage: string;
  products: Product[];
  searchTermFormControl = new FormControl();
  killSubs = new Subject();

  constructor(private productService: ProductService, private router: Router) {}

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe(
        products => (this.products = products),
        error => (this.errorMessage = <any>error)
      );

    this.searchTermFormControl.valueChanges
      .pipe(takeUntil(this.killSubs))
      .subscribe((value) => this.searchTerm = value);
  }

  ngOnDestroy() {
    this.killSubs.next();
  }

  onProductClick(product: Product) {
    this.router.navigate(['products', product.id]);
  }

  onEditClick(product: Product) {
    this.router.navigate(['products', product.id, 'edit']);
  }
}
