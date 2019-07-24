import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1700, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit {
  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  images = [];
  noWrapSlides = false;
  constructor() {
  }

  ngOnInit() {
    this.images.push('../../../assets/images/1.jpg');
    this.images.push('../../../assets/images/2.jpg');
    this.images.push('../../../assets/images/3.jpg');
    this.images.push('../../../assets/images/6.jpg');
  }

}
