import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Offer, Product } from '../products/shared/model/cart.model';

export interface BrandIcons {
  id: number;
  image: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  offers: Offer[] = [];
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  brandIcons: BrandIcons[] = [];
  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<Product>('assets/offers.json')
      .pipe(
        tap((products: any) => {
          this.offers = products.offers;
        })
      )
      .subscribe();
    this.httpClient
      .get<BrandIcons>('assets/products.json')
      .pipe(
        tap((brandIcons: any) => {
          this.brandIcons = brandIcons.brandIcons;
        })
      )
      .subscribe();
  }
}
