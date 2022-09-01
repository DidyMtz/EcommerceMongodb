import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  carousel : any[] = [];

  constructor(private produitservice : ProduitService) { }

  ngOnInit(): void {

    this.carousel = this.produitservice.carousel;
    //console.warn(this.carousel);
    
  }

  

}
