import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from '../products/products.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  products: Product[] = [];
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  constructor(private readonly httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<any>('assets/products.json').pipe(tap((products: any)=> {this.products = products.data;})).subscribe();
  }
}
