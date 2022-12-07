import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../../model/produit';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-affiche-produit',
  templateUrl: './affiche-produit.component.html',
  styleUrls: ['./affiche-produit.component.scss']
})
export class AfficheProduitComponent implements OnInit {

  listProduit: any[] = [];
  message : string = '';
  categorie : any[] = [];
  listCategories : any[] = [];
  prixDiscount : number = 0;

  constructor(
    private route: Router, 
    private produitservice: ProduitService
    ) { }

  ngOnInit(): void {

   this.getProduits();
    
  }

  getProduits(){
    this.produitservice.getProduit().subscribe(
      (res: any) => {
        this.listProduit = res;
        this.listProduit.forEach(produit => {
         
          if(!produit.photo) return ;
          
          if(!produit.photo.includes('assets')){
            produit.photo = '/assets/img/upload/'+produit.photo;   
                     
          }else{
            produit.photo = produit.photo.substring(6);
          }
        })

        
      /* filtrer et créer array par categorie */
        this.produitservice.categorie.forEach(elt =>{
          if(this.listProduit != null)
            this.categorie.push(this.listProduit.filter((i) => i.categorie === elt));
      
        }); //console.log(this.categorie);
      },
      (err) => {console.log(err);}      
    )
  }

  AjouterPanier(produit:Produit){
    
   this.produitservice.AjoutPanier(produit);
   this.message = produit.name+" ajouté au panier";
   this.route.navigate(['details-produit/'+produit._id]);
   
  }

  getDiscount(produit: Produit){
  if(!produit.discount) return null;
    return this.prixDiscount = Math.floor(produit.prix - produit.prix * produit.discount/100);
   
   }

   customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  };
  produitOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['précedent', 'suivant'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }


}
