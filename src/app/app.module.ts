import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {MenubarModule} from 'primeng/menubar';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {HttpClientModule} from '@angular/common/http';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {CarouselModule} from 'primeng/carousel';
import {InputTextModule} from 'primeng/inputtext';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';
import { CartProductsComponent } from './products/cart-products/cart-products.component';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {BadgeModule} from 'primeng/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckOutComponent } from './check-out/check-out.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductsComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    CartProductsComponent,
    CheckOutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BadgeModule,
    DynamicDialogModule,
    MessageModule,
    MessagesModule,
    DataViewModule,
    ReactiveFormsModule,
    InputTextModule,
    CarouselModule,
    RippleModule,
    RatingModule,
    ButtonModule,
    DropdownModule,
    DataViewModule,
    HttpClientModule,
    MenubarModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MessageService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
