import { Produit } from 'src/app/modal/produit';
import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  carousel : Produit[] = [];
  typesOfShoes: string[] = ['Plat Braisé', 'Accompagnement', 'Boisson', 'Viande', 'Poisson', 'Promotion'];

  constructor(private produitservice : ProduitService) { }

  ngOnInit(): void {

   this.getProduit();
    
  }

  getProduit(){
    this.produitservice.getProduit().subscribe(
      (res:any) => {
       const item = res;
       this.carousel = item;
       this.carousel = this.carousel.filter(i => i.favori === 'non')
        this.carousel.forEach(produit => {
          if(!produit.photo.includes('assets')){
            produit.photo = '/assets/img/upload/'+produit.photo;

          }else{ produit.photo = produit.photo.substring(6); }
        })
        
   // console.warn(this.carousel);
      },
      (err) => console.log(err)
      
    )
  }

}
