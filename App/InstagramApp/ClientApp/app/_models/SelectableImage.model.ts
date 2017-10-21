import { Image } from '../_models/User';

export class SelectableImage extends Image {
    selected: boolean;

    constructor(image: Image) {
        super();
        this.thumbnail = image.thumbnail;
        this.low_resolution = image.low_resolution;
        this.standard_resolution = image.standard_resolution;
        this.selected = false;
    }

    switch() {
        this.selected = !this.selected
    }

}