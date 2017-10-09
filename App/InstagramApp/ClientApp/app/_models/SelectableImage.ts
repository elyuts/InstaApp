export class SelectableImage {
    url: string;
    selected: boolean;

    constructor(url: string) {
        this.url = url;
        this.selected = false;
    }

    switch() {
        this.selected = !this.selected
    }

}