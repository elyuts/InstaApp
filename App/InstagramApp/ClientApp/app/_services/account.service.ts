import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AccountService {

    accessTokenKey = 'access_token';

    constructor(private localStorageService: LocalStorageService) {
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
}