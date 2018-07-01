import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';

@Component({
	templateUrl: 'product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
	@ViewChild(NgForm) productForm: NgForm;
	errorMessage: string;
	product = { id: 1, productName: 'test', productCode: 'test' };
	killSubs = new Subject();

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
		this.route.parent.data
			.pipe(
				takeUntil(this.killSubs),
				map((data) => data.product),
				filter((p) => !!p)
			)
			.subscribe((p) => {
				this.product = p;
				if (this.productForm) {
					this.productForm.reset();
				}
			});
	}
}
