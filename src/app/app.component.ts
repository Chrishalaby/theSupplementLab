import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'The Supplement Lab';
  constructor(private primengConfig: PrimeNGConfig) {
    Carousel.prototype.onTouchMove = () => { };
  }
  ngOnInit() {
      this.primengConfig.ripple = true;
  }
}
