import { ProduitService } from 'src/app/services/produit.service';
import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/model/produit';

@Component({
  selector: 'app-categorie-produit',
  templateUrl: './categorie-produit.component.html',
  styleUrls: ['./categorie-produit.component.scss']
})
export class CategorieProduitComponent implements OnInit {

  link: any;
  listProduit : Produit[] = [];
  listProduits : Produit[] = []
  message: string ="";
  prixDiscount : number = 0;

  constructor(private route : Router,private activatedroute : ActivatedRoute, private produitservice : ProduitService) { }

  ngOnInit(): void {   
    this.getLink();
  }


//recuperer le lien categorie
  getLink(){
    this.activatedroute.paramMap.subscribe((path => {
       this.link = path.get('link');
      
       
       this.getProduit();
       
    })

    )
  }
  //recuperer liste des produits
  getProduit(){
    this.produitservice.getProduit().subscribe(
      (res:any) => {

         this.listProduits = res;

        if(!this.listProduit) return ;

        //fixer lien images
        this.listProduits.forEach(produit => {
          if(!produit.photo.includes('assets')){
            produit.photo = '/assets/img/upload/'+produit.photo;

          }else{ produit.photo = produit.photo.substring(6); }
        });

        //filtrer produit selon promotion
        if(this.link === 'Promotion') {
          this.listProduit = this.listProduits.filter(i => i.discount != 0);         
        }else{

              //filtrer produit selon categorie principale
          this.listProduit = this.listProduits.filter(i => (i.categorie)?.toLowerCase() === (this.link).toLowerCase())
             
              //filtrer produit selon categorie viande et poisson
           if(this.listProduit.length === 0) {
             this.listProduit = this.listProduits.filter(i => (i.description?.toLowerCase().includes(this.link.toLowerCase())));
          
           }
        }
       
       


      },
      (err) => this.message = err
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

}
