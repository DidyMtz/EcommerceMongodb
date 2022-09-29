import { Router } from '@angular/router';
import { Produit } from 'src/app/modal/produit';
import { ProduitService } from '../../services/produit.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  carousel : Produit[] = [];
  typesOfShoes: string[] = ['Plat Principal', 'Accompagnement', 'Boisson', 'Viande', 'Poisson', 'Promotion'];
  @Input() link: string ="";

  

  constructor(private produitservice : ProduitService, private route : Router) { }

  ngOnInit(): void {
   this.getProduit();
    
  }


  getlink(valeur: any){
    
   this.link = valeur[0];
   this.route.navigate(['categorie/'+this.link])
    
  }
  getProduit(){
    this.produitservice.getProduit().subscribe(
      (res:any) => {
      
       this.carousel = res;
       this.carousel = this.carousel.filter(i => i.favori === 'oui')
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
