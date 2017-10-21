import { Injectable } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { LocalStorageService } from 'angular-2-local-storage';
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

    public addPicture(image: Image): boolean {
        var images = this.getPictures();
        images.push(new ImageInCart(image));

        var token = this.accountService.accessToken();
        return this.localStorageService.set(token, images);
    }

    public updateQuantity(image: ImageInCart): boolean {
        var images = this.getPictures();

        images.forEach(x => {
            if (x.thumbnail.url == image.thumbnail.url)
                x.quantity = image.quantity;
        });

        var token = this.accountService.accessToken();
        return this.localStorageService.set(token, images);
    }

    public removePicture(image: Image): boolean {
        var images = this.getPictures();
        var newImages: Image[] = [];

        images.forEach(x => {
            if (x.thumbnail.url != image.thumbnail.url)
                newImages.push(x);
        });

        var token = this.accountService.accessToken();
        return this.localStorageService.set(token, newImages);
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
        var images = this.localStorageService.get<ImageInCart[]>(token);
        if (!images) 
            images = [];

        console.log(`images.length=${images.length}`);

        return images;
    }

}