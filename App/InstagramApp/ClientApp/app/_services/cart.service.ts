import { Injectable } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { SelectableImage } from '../_models/SelectableImage';
import { GetMediaResponse, User, Images } from '../_models/User';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CartService {

    constructor(
        private accountService: AccountService,
        private localStorageService: LocalStorageService) {
    }

    public addPicture(image: Images): boolean {
        var images = this.getPictures();
        images.push(image);

        var token = this.accountService.accessToken();
        return this.localStorageService.set(token, images);
    }

    public removePicture(image: Images): boolean {
        var images = this.getPictures();
        var newImages: Images[] = [];

        images.forEach(x => {
            if (x.thumbnail.url != image.thumbnail.url)
                newImages.push(x);
        });

        var token = this.accountService.accessToken();
        return this.localStorageService.set(token, newImages);
    }

    public imageIsInCart(image: Images): boolean {
        var images = this.getPictures();

        var result = false;

        images.forEach(x => {
            console.log(`(x.thumbnail.url == image.thumbnail.url)=${x.thumbnail.url == image.thumbnail.url}`)
            if (x.thumbnail.url == image.thumbnail.url)
                result = true;
        });

        return result;
    }

    public getPictures(): Images[] {
        var token = this.accountService.accessToken();
        var images = this.localStorageService.get<Images[]>(token);
        if (!images) 
            images = [];

        console.log(`images.length=${images.length}`);

        return images;
    }

}