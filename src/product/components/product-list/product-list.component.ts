import { Component, OnInit } from '@angular/core';

import { Product } from '../../models';
import { ProductService } from '../../services';

@Component({
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    listFilter: string;
    errorMessage: string;

    products: Product[];

    constructor(private productService: ProductService) { }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.productService.getProducts()
                .subscribe(products => this.products = products,
                           error => this.errorMessage = <any>error);
    }
}
