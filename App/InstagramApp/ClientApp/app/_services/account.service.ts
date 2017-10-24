import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { isPlatformServer } from '@angular/common'

@Injectable()
export class AccountService {

    get accessTokenKey() {
        return 'access_token';
    }

    constructor(
        private localStorageService: LocalStorageService,
        @Inject(PLATFORM_ID) private platformId: Object) {
    }

    accessToken(): string {
        return this.localStorageService.getString(this.accessTokenKey);
    }

    isLoggedIn(): boolean {
        if (isPlatformServer(this.platformId))
            return false;

        var token = this.accessToken();
        console.log(`token = ${token}`);
        return !!token;
    }
}