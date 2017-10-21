import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { SelectableImage } from '../../_models/SelectableImage.model';

@Component({
    selector: 'qty-input',
    templateUrl: './quantity-input.component.html',
    styleUrls: ['./quantity-input.component.css']
})
export class QuantityInputComponent {
    @Input() qty: number;
    @Output() qtyChange = new EventEmitter<number>();
    @Output() onChange = new EventEmitter();
    @Input() min: number = 1;
    @Input() max: number = 100;

    clickPlus() {
        if (!this.maxIsReached())
            this.qtyChange.emit(++this.qty);
        this.onChange.emit();
    }

    clickMinus() {
        if (!this.minIsReached())
            this.qtyChange.emit(--this.qty);
        this.onChange.emit();
    }

    maxIsReached(): boolean {
        return this.qty >= this.max;
    }

    minIsReached(): boolean {
        return this.qty <= this.min;
    }
}
