import { ProduitService } from './../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../produit';

@Component({
  selector: 'app-carousel-footer',
  templateUrl: './carousel-footer.component.html',
  styleUrls: ['./carousel-footer.component.scss']
})
export class CarouselFooterComponent implements OnInit {

  carousel : any[] = [];

  constructor(private produitservice : ProduitService) { }

  ngOnInit(): void {
  
    //afficher 3 elmt au hazard par categorie
    
  this.carousel.push(this.produitservice.carousel);
  
  

  }

}
