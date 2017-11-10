import { Component, Input } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { SelectableImage } from '../../_models/SelectableImage.model';

@Component({
    selector: 'image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent {
    @Input("source") image: SelectableImage;
    public isZoomed: boolean;

    constructor(private cartService: CartService) {
    }

    public addToCart() {
        this.cartService.addPicture(this.image);
        this.image.selected = true;
    }

    public removeFromCart() {
        this.cartService.removePicture(this.image);
        this.image.selected = false;
    }

    public openFullSize() {
        this.isZoomed = true;
    }

    public closeFullSize() {
        this.isZoomed = false;
    }

    public doNothing() {
    }
}
