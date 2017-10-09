import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AuthHttp {
    constructor(private http: Http) { }

    get(url: string) {
        return this.http.get(url, this.jwt());
    }

    post(url: string, body: any) {
        return this.http.post(url, body, this.jwt());
    }

    put(url: string, body: any) {
        return this.http.put(url, body, this.jwt());
    }

    delete(url: string) {
        return this.http.delete(url, this.jwt());
    }

    // private helper methods

    private jwt() {
        var userString: string = String(localStorage.getItem('currentUser'));

        // create authorization header with jwt token
        let currentUser = JSON.parse(userString);
        if (currentUser && currentUser.token) {
            let headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.token
            });
            return new RequestOptions({ headers: headers });
        }
    }
}