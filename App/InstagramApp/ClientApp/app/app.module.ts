import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule, Jsonp, Response } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { ImageComponent } from './components/image/image.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';

import { QuantityInputComponent } from './components/quantity-input/quantity-input.component';

import { AccountService } from './_services/account.service';
import { CartService } from './_services/cart.service';
import { InstagramService } from './_services/instagram.service';
import { LocalStorageService } from './_services/local-storage.service';
import { LocalStorage } from './_services/local-storage';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FetchDataComponent,
        ImageComponent,
        CartComponent,
        CartItemComponent,
        QuantityInputComponent
    ],
    providers: [
        AccountService,
        CartService,
        InstagramService,
        LocalStorageService,
        { provide: LocalStorage, useValue: { getItem() { } } }
    ],
    imports: [
        CommonModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'cart', component: CartComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
