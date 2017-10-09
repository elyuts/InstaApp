import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from './authhttp.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import { GetMediaResponse } from '../_models/User'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class InstagramService {

    accessTokenKey = 'access_token';

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService) { }

    accessToken() {

        var token: string = this.localStorageService.get(this.accessTokenKey);

        if (!token && (typeof localStorage != 'undefined') && localStorage.getItem(this.accessTokenKey)) {
            token = String(localStorage.getItem(this.accessTokenKey));
            this.localStorageService.set(this.accessTokenKey, token);
        }
        return token;
    }

    isLoggedIn(): boolean {
        var token = this.accessToken();
        console.log(`token = ${token}`);
        return token != null;
    }

    getCurrentUser() {
    }

    getCurrentUserMedia(): Observable<GetMediaResponse[]> {
        return this.http.get('https://api.instagram.com/v1/users/self/media/recent?access_token=' + this.accessToken())
            .map(res => res.json())
            .catch(this.handleError);
    }

    getCurrentUserLikedMedia(): Observable<GetMediaResponse[]> {
        return this.http.get('https://api.instagram.com/v1/users/self/media/liked?access_token=' + this.accessToken())
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(err: any) {
        console.error(err.message);
        return Observable.throw(err.message || err)
    }
}