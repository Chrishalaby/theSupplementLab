import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthService } from '../admin/login/service/auth.service';
import { OfferOverviewComponent } from '../products/offer-overview/offer-overview.component';
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
export class HomeComponent implements OnInit {
  offers: any[] = [];
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
    private readonly authService: AuthService,
    private readonly proxyService: ProxyService,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.canLogin;

    this.proxyService.Get_Offer_By_Where(1).subscribe((products: any) => {
      this.offers = products.My_Result;
    });
  }

  onDelete(offer: Params_Delete_Offer) {
    this.proxyService
      .Delete_Offer({ OFFER_ID: offer.OFFER_ID })
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Offer Deleted',
        });
      });
    // test
  }

  showProductOverview(product: any) {
    this.dialogService
      .open(OfferOverviewComponent, {
        data: product,
        header: 'Offer Overview',
        width: '90%',
      })
      .onClose.subscribe((added) => {
        if (added) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Offer Added To Cart',
          });
        }
      });
  }
}
