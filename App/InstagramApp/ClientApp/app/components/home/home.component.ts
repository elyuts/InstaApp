import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InstagramService } from '../../_services/instagram.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private instagramService: InstagramService) {
    }

    isLoggedIn(): boolean {

        return false;//this.instagramService.isLoggedIn();
    }
}
