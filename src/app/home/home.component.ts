import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { AuthService } from '../admin/login/service/auth.service';
import { Offer, Product } from '../products/shared/model/cart.model';
import { Params_Delete_Offer, ProxyService } from '../proxy.service';

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

  isLoggedIn: boolean = false;

  brandIcons: BrandIcons[] = [];
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
    private readonly proxyService: ProxyService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.canLogin;

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

  onDelete(offer: Params_Delete_Offer) {
    this.proxyService
      .Delete_Offer({ OFFER_ID: offer.OFFER_ID })
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Offer Deleted',
        });
      });
  }
}
