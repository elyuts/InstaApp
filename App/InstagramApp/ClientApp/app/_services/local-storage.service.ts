import { Injectable, Inject, PLATFORM_ID, OpaqueToken } from '@angular/core';
import { LocalStorage } from './local-storage';

@Injectable()
export class LocalStorageService {

    constructor(@Inject(LocalStorage) private localStorage: any) {
    }

    set(key: string, value: any) {
        if (typeof value == 'string')
            this.localStorage.setItem(key, value);
        else
            this.localStorage.setItem(key, JSON.stringify(value));
    }

    getString(key: string): string {
        return this.localStorage.getItem(key);
    }

    getObject(key: string): any {
        return JSON.parse(this.localStorage.getItem(key));
    }    
}