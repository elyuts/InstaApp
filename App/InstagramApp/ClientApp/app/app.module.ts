import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Jsonp, Response } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { AuthHttp } from './_services/authhttp.service';
import { InstagramService } from './_services/instagram.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        FetchDataComponent,
        HomeComponent
    ],
    providers: [
        AuthHttp,
        InstagramService
    ],
    imports: [
        CommonModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        ReactiveFormsModule,
        LocalStorageModule.withConfig({
            prefix: 'my-app',
            storageType: 'localStorage'
        }),
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
