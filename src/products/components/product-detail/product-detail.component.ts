import { Component } from '@angular/core';

import { Product } from '../../models';
import { ProductService } from '../../services';

@Component({
    templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent {
    pageTitle = 'Product Detail';
    product: Product;
    errorMessage: string;

    constructor(private productService: ProductService) { }

    getProduct(id: number) {
        this.productService.getProduct(id).subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }
}
