import { Images } from '../_models/User';

export class SelectableImage {
    images: Images;
    selected: boolean;

    constructor(images: Images) {
        this.images = images;
        this.selected = false;
    }

    switch() {
        this.selected = !this.selected
    }

}