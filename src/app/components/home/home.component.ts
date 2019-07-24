import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  images = [];
  constructor(config: NgbCarouselConfig) {
    config.wrap=false;
  }

  ngOnInit() {
    this.images.push('../../../assets/images/1.jpg');
    this.images.push('../../../assets/images/2.jpg');
    this.images.push('../../../assets/images/3.jpg');
    this.images.push('../../../assets/images/6.jpg');
  }

}
