import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'product-edit-tags.component.html'
})
export class ProductEditTagsComponent implements OnInit {
    errorMessage: string;
    newTags = '';
    product = { id: 1, category: 'test', tags: ['test']};

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
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
