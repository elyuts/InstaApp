import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstagramService } from '../../_services/instagram.service';
import { AccountService } from '../../_services/account.service';
import { CartService } from '../../_services/cart.service';
import { InstagramMediaType, InstagramMediaResponse } from '../../_models/User';
import { SelectableImage } from '../../_models/SelectableImage.model';
import { Image } from '../../_models/User';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
    styleUrls: ['./fetchdata.component.css']
})
export class FetchDataComponent implements OnInit {
    public imageList: SelectableImage[] = [];
    public imagesInCart: Image[] = [];

    constructor(
        private accountService: AccountService,
        private instagramService: InstagramService,
        private cartService: CartService,
        private router: Router) {
    }

    ngOnInit() {
        if (!this.accountService.isLoggedIn()) {
            this.router.navigate(['/home']);
            return;
        }

        this.imagesInCart = this.cartService.getPictures();
        this.instagramService.getCurrentUserMedia().subscribe(result => {
            this.iterateThroughMediaResponseList(result);
        });
    }

    private iterateThroughMediaResponseList(list: InstagramMediaResponse[]) {
        list.forEach(x => {
            if (x.type == InstagramMediaType.image) {
                var image = new SelectableImage(x.images);
                image.selected = this.cartService.imageIsInCart(image);
                this.imageList.push(image);
            } else if (x.type == InstagramMediaType.carousel) {
                this.iterateThroughMediaResponseList(x.carousel_media);
            }
        });
    }
}
