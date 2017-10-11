import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { InstagramService } from '../../_services/instagram.service';
import { MediaType, GetMediaResponse, MediaResponse } from '../../_models/User';
import { SelectableImage } from '../../_models/SelectableImage';

@Component({
    selector: 'fetchdata',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public imageList: SelectableImage[] = [];

    constructor(instagramService: InstagramService) {
        instagramService.getCurrentUserMedia().subscribe(result => {
            this.iterateThroughMediaResponseList(result);
        });
    }

    iterateThroughMediaResponseList(list: MediaResponse[]) {
        list.forEach(x => {
            if (x.type == MediaType.image) {
                this.imageList.push(new SelectableImage(x.images.standard_resolution.url));
            } else if (x.type == MediaType.carousel) {
                this.iterateThroughMediaResponseList(x.carousel_media);
            }
        });
    }
}
