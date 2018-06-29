import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Product } from '../models';

import { ProductDbService } from './product-db.service';

@Injectable()
export class ProductService {
    private readonly throttle = 1000;

    constructor(private dbService: ProductDbService) {}

    getProducts(): Observable<Product[]> {
        return this.prepResponse(this.dbService.getProducts());
    }

    getProduct(id: number): Observable<Product> {
        if (id === 0) {
            return of(this.initializeProduct());
        }

        return this.prepResponse(this.dbService.getProduct(id));
    }

    deleteProduct(id: number): Observable<any> {
        return this.prepResponse(this.dbService.deleteProduct(id));
    }

    saveProduct(product: Product): Observable<Product> {
        if (product.id === 0) {
            return this.prepResponse(this.dbService.createProduct(product));
        }

        return this.prepResponse(this.dbService.updateProduct(product));
    }

    private prepResponse(data: any) {
        return of(data).pipe(delay(this.throttle));
    }

    initializeProduct(): Product {
        return {
            id: 0,
            productName: null,
            productCode: null,
            category: null,
            tags: [],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null
        };
    }
}
