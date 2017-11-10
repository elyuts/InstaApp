﻿import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { LocalStorageService } from './local-storage.service';
import { SelectableImage } from '../_models/SelectableImage.model';
import { ImageInCart } from '../_models/ImageInCart.model';
import { InstagramGetMediaResponse, InstagramUser, Image } from '../_models/User';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CartService {

    constructor(
        private accountService: AccountService,
        private localStorageService: LocalStorageService) {
    }

    public addPicture(image: Image) {
        var images = this.getPictures();
        images.push(new ImageInCart(image));

        var token = this.accountService.accessToken();
        this.localStorageService.set(token, images);
    }

    public updateQuantity(image: ImageInCart) {
        var images = this.getPictures();

        images.forEach(x => {
            if (x.thumbnail.url == image.thumbnail.url)
                x.quantity = image.quantity;
        });

        var token = this.accountService.accessToken();
        this.localStorageService.set(token, images);
    }

    public removePicture(image: Image) {
        var images = this.getPictures();
        var newImages: Image[] = [];

        images.forEach(x => {
            if (x.thumbnail.url != image.thumbnail.url)
                newImages.push(x);
        });

        var token = this.accountService.accessToken();
        this.localStorageService.set(token, newImages);
    }

    public imageIsInCart(image: Image): boolean {
        var images = this.getPictures();

        var result = false;

        images.forEach(x => {
            console.log(`(x.thumbnail.url == image.thumbnail.url)=${x.thumbnail.url == image.thumbnail.url}`)
            if (x.thumbnail.url == image.thumbnail.url)
                result = true;
        });

        return result;
    }

    public getPictures(): ImageInCart[] {
        var token = this.accountService.accessToken();
        var images: ImageInCart[] = this.localStorageService.getObject(token);
        if (!images) 
            images = [];

        console.log(`images.length=${images.length}`);

        return images;
    }

    public  get pricePerPhoto(): number {
        return 0.15;
    }

    public getTotaPrice(): number {
        var items = this.getPictures();

        var totalQty = 0;
        items.forEach(x => totalQty += x.quantity);

        return totalQty * this.pricePerPhoto;
    }

}