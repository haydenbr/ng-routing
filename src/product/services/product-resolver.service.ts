import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Product } from '../models';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolverService implements Resolve<Product> {
	constructor(private productSvc: ProductService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
		const id = Number(route.paramMap.get('id'));
		return this.productSvc.getProduct(id);
	}
}
