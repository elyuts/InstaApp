import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { ImageInCart } from '../../_models/ImageInCart.model';

@Component({
    selector: 'cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
    @Input("source") image: ImageInCart;
    @Output() delete = new EventEmitter();
    public isZoomed: boolean;

    constructor(private cartService: CartService) {
    }

    public removeFromCart() {
        this.delete.emit();
    }

    public openFullSize() {
        this.isZoomed = true;
    }

    public closeFullSize() {
        this.isZoomed = false;
    }

    onQtyChange() {
        console.log(`onQtyChange=${this.image.quantity}`);
        this.cartService.updateQuantity(this.image);
    }
}
