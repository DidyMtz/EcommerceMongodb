
import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../../model/produit';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-carousel-footer',
  templateUrl: './carousel-footer.component.html',
  styleUrls: ['./carousel-footer.component.scss']
})
export class CarouselFooterComponent implements OnInit {

  carousel : any[] = [];
  listProduit : any[] = [];
  routes: string = "";
  hideCarousel : boolean = false;
  produit = new Produit;


  constructor(
    private produitservice : ProduitService,
    private route : Router
    ) { }

  ngOnInit(): void {
  
    this.getProduit();
  /* Remplissage provisoire carousel produit favoris */
  //this.carousel.push(this.produitservice.carousel.reverse());
   

  }

  AjouterPanier(produit:Produit){

    this.produitservice.AjoutPanier(produit);
    this.route.navigate(['details-produit/'+produit._id])
    .then(() => {
      window.location.reload();
    })
  }

  getProduit(){
    const list = this.produitservice.getProduit().subscribe(
      (res:any)=>{
      this.listProduit.push(res);
      if(this.listProduit != null)
      this.carousel.push(this.listProduit[0].filter((i:any) => i.favori ==='oui')) ;
      
      this.carousel.flat()
      .forEach((elt) => {        
        if(elt.photo.includes('assets')){
          elt.photo = elt.photo.substring(6)
        }else{ elt.photo = "/assets/img/upload/"+elt.photo}

      }) ;
      
      
      },
      (err:any) => console.log(err)
      
    )
  }
  
  
}
