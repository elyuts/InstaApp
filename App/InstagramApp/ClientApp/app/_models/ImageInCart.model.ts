import { Image } from '../_models/User';

export class ImageInCart extends Image {
    quantity: number;

    constructor(image: Image, quantity: number = 1) {
        super();
        this.thumbnail = image.thumbnail;
        this.low_resolution = image.low_resolution;
        this.standard_resolution = image.standard_resolution;
        this.quantity = quantity;
    }
}