import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    isLoggedIn(): boolean {
        return false;
        //return localStorage.getItem('access_token') != null;
    }
}
