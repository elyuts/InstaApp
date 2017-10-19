import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { InstagramGetMediaResponse, InstagramUser } from '../_models/User';
import { AccountService } from '../_services/account.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class InstagramService {

    constructor(
        private jsonp: Jsonp,
        private accountService: AccountService) {
    }

    getCurrentUser(): Observable<InstagramUser> {
        return this.jsonp.get('https://api.instagram.com/v1/users/self?access_token=' + this.accountService.accessToken() + '&callback=JSONP_CALLBACK')
            .map(res => res.json().data)
            .catch(this.handleError);
    }

    getCurrentUserMedia(): Observable<InstagramGetMediaResponse[]> {

        return this.jsonp.get('https://api.instagram.com/v1/users/self/media/recent?access_token=' + this.accountService.accessToken() + '&callback=JSONP_CALLBACK')
            .map(res => res.json().data)
            .catch(this.handleError);
    }

    getUserLikedMedia(): Observable<InstagramGetMediaResponse[]> {

        return this.jsonp.get('https://api.instagram.com/v1/users/self/media/liked?access_token=' + this.accountService.accessToken() + '&callback=JSONP_CALLBACK')
            .map(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(err: any) {
        console.error(err);
        return Observable.throw(err)
    }
}