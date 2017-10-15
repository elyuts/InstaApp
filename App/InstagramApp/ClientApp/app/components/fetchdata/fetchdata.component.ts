import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../../_services/instagram.service';
import { CartService } from '../../_services/cart.service';
import { MediaType, MediaResponse } from '../../_models/User';
import { SelectableImage } from '../../_models/SelectableImage';
import { Images } from '../../_models/User';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html',
    styleUrls: ['./fetchdata.component.css']
})
export class FetchDataComponent implements OnInit {
    public imageList: SelectableImage[] = [];
    public imagesInCart: Images[] = [];

    constructor(private instagramService: InstagramService, private cartService: CartService) {
    }

    ngOnInit() {
        this.imagesInCart = this.cartService.getPictures();
        this.instagramService.getCurrentUserMedia().subscribe(result => {
            this.iterateThroughMediaResponseList(result);
        });
    }

    private iterateThroughMediaResponseList(list: MediaResponse[]) {
        list.forEach(x => {
            if (x.type == MediaType.image) {
                var image = new SelectableImage(x.images);
                image.selected = this.cartService.imageIsInCart(image.images)
                this.imageList.push(image);
            } else if (x.type == MediaType.carousel) {
                this.iterateThroughMediaResponseList(x.carousel_media);
            }
        });
    }
}
