import { Component } from '@angular/core';
import { AccountService } from '../../_services/account.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    constructor(private accountService: AccountService) {
    }

    isLoggedIn(): boolean {
        return this.accountService.isLoggedIn();
    }
}
