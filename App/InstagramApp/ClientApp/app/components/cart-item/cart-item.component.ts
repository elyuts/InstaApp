import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../../_models/User';

@Component({
    selector: 'cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
    @Input("source") image: Image;
    @Output() delete = new EventEmitter();
    public isZoomed: boolean;

    public removeFromCart() {
        this.delete.emit();
    }

    public openFullSize() {
        this.isZoomed = true;
    }

    public closeFullSize() {
        this.isZoomed = false;
    }
}
