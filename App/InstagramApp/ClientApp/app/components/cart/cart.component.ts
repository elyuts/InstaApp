import { Component, OnInit } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { InstagramMediaType, InstagramMediaResponse } from '../../_models/User';
import { SelectableImage } from '../../_models/SelectableImage';
import { Image } from '../../_models/User';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    public imageList: Image[] = [];
    
    constructor(private cartService: CartService) {
    }

    ngOnInit() {
        this.imageList = this.cartService.getPictures();
    }

    deleteItem(image: Image) {
        if (this.cartService.removePicture(image)) {

            let index = this.imageList.indexOf(image);

            if (index > -1) {
                this.imageList.splice(index, 1);
            }
        }
    }


}
