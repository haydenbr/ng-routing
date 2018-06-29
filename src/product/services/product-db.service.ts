import { Injectable } from '@angular/core';

import { productData, Product } from '../models';

@Injectable()
export class ProductDbService {
	private products: Product[] = productData.concat();

	getProducts(): Product[] {
		return this.products;
	}

	getProduct(id: number): Product {
		return this.products.find((p) => p.id === id);
	}

	deleteProduct(id: number): Product {
		const product = this.getProduct(id);

		this.products = this.products.filter(p => p.id === id);

		return product;
	}

	createProduct(product: Product): Product {
		this.products = this.products.concat(product);
		return product;
	}

	updateProduct(product: Product): Product {
		this.products = this.products.map(p => p.id === product.id ? product : p);
		return product;
	}
}
