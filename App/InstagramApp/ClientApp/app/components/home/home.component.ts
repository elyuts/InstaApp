import { Component } from '@angular/core';
import { AccountService } from '../../_services/account.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private accountService: AccountService) {
    }

    isLoggedIn(): boolean {
        return this.accountService.isLoggedIn();
    }
}
