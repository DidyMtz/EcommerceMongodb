
import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../../modal/produit';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-carousel-footer',
  templateUrl: './carousel-footer.component.html',
  styleUrls: ['./carousel-footer.component.scss']
})
export class CarouselFooterComponent implements OnInit {

  carousel : any[] = [];
  routes: string = "";
  hideCarousel : boolean = false;


  constructor(
    private produitservice : ProduitService,
    private route : Router
    ) { }

  ngOnInit(): void {
  
  /* Remplissage provisoire carousel produit favoris */
  this.carousel.push(this.produitservice.carousel.reverse());
   

  }

  AjouterPanier(produit:Produit){

    this.produitservice.AjoutPanier(produit);
    this.route.navigate(['details-produit/'+produit.name])
    .then(() => {
      window.location.reload();
    })
  }
  
  
}
