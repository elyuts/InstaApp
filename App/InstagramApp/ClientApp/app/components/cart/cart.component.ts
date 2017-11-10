import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { CartService } from '../../_services/cart.service';
import { InstagramMediaType, InstagramMediaResponse } from '../../_models/User';
import { SelectableImage } from '../../_models/SelectableImage.model';
import { ImageInCart } from '../../_models/ImageInCart.model';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    public imageList: ImageInCart[] = [];
    public totalPrice: number;
    
    constructor(
        private accountService: AccountService,
        private cartService: CartService,
        private router: Router) {
    }

    ngOnInit() {
        if (!this.accountService.isLoggedIn()) {
            this.router.navigate(['/home']);
            return;
        }

        this.imageList = this.cartService.getPictures();
        this.updateTotal();
    }

    deleteItem(image: ImageInCart) {
        this.cartService.removePicture(image);
        let index = this.imageList.indexOf(image);

        if (index > -1) {
            this.imageList.splice(index, 1);
        }

        this.updateTotal();
    }

    updateTotal() {
        this.totalPrice = this.cartService.getTotaPrice();
    }
}
