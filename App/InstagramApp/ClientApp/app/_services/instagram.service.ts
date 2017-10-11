import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from './authhttp.service';
import { Http, Jsonp, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'angular-2-local-storage';
import { GetMediaResponse, User } from '../_models/User'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class InstagramService {

    accessTokenKey = 'access_token';
    params: URLSearchParams;        //work around for jsonp

    constructor(
        private http: Http,
        private jsonp: Jsonp,
        private localStorageService: LocalStorageService) {

        this.params = new URLSearchParams();
        this.params.set('format', 'json');
        this.params.set('callback', '__ng_jsonp__.__req0.finished');
    }

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

    getCurrentUser(): Observable<User> {
        return this.jsonp.get('https://api.instagram.com/v1/users/self?access_token=' + this.accessToken(), { search: this.params })
            .map(res => res.json().data)
            .catch(this.handleError);
    }

    getCurrentUserMedia(): Observable<GetMediaResponse[]> {

        return this.jsonp.get('https://api.instagram.com/v1/users/self/media/recent?access_token=' + this.accessToken(), { search: this.params })
            .map(res => res.json().data)
            .catch(this.handleError);
    }

    getUserLikedMedia(): Observable<GetMediaResponse[]> {

        return this.jsonp.get('https://api.instagram.com/v1/users/self/media/liked?access_token=' + this.accessToken(), { search: this.params })
            .map(res => res.json().data)
            .catch(this.handleError);
    }

    private handleError(err: any) {
        console.error(err);
        return Observable.throw(err)
    }
}