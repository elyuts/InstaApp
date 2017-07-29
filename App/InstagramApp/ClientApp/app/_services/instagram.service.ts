import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from './authhttp.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class InstagramService {

    constructor(private http: Http) { }

    //getAll(): Observable<Project[]> {
    //    return this.http.get('/project/getAll')
    //        .map(res => res.json() as Project[])
    //        .catch(this.handleError);
    //}

    //getById(id: string): Observable<Project> {
    //    return this.http.get('/project/getById/' + id)
    //        .map(res => res.json() as Project)
    //        .catch(this.handleError);
    //}

    //create(project: Project): Observable<Project> {
    //    return this.http.post('/Project/Create', project)
    //        .map(res => res.json().data as Project)
    //        .catch(this.handleError);
    //}


    private handleError(err: any) {
        console.error(err.message);
        return Observable.throw(err.message || err)
    }
}