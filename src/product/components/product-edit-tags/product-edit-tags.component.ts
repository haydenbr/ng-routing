import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';

import { Product } from '../../models';

@Component({
	templateUrl: 'product-edit-tags.component.html'
})
export class ProductEditTagsComponent implements OnInit {
	errorMessage: string;
	newTags = '';
	product: Product;
	killSubs = new Subject();

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.parent.data
			.pipe(
				takeUntil(this.killSubs),
				map((data) => data.product),
				filter((p) => !!p)
			)
			.subscribe((p) => (this.product = p));
	}

	// Add the defined tags
	addTags(): void {
		const tagArray = this.newTags.split(',');
		this.product.tags = this.product.tags ? this.product.tags.concat(tagArray) : tagArray;
		this.newTags = '';
	}

	// Remove the tag from the array of tags.
	removeTag(idx: number): void {
		this.product.tags.splice(idx, 1);
	}
}
