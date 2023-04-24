import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CartProductsComponent } from './products/cart-products/cart-products.component';
import { ProductDescriptionComponent } from './products/product-description/product-description.component';
import { ProductOverviewComponent } from './products/product-overview/product-overview.component';
import { ProductsComponent } from './products/products.component';

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
    CheckOutComponent,
    ProductDescriptionComponent,
    ProductOverviewComponent,
  ],
  imports: [
    CardModule,
    InputNumberModule,
    GalleriaModule,
    DialogModule,
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
    AppRoutingModule,
  ],
  providers: [MessageService, DialogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
