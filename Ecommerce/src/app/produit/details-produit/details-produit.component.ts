import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, BehaviorSubject, timeInterval, timeout } from 'rxjs';
import { Produit } from '../../model/produit';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {

  id!: any;
  singleProduit : Produit[] = [];
  message : BehaviorSubject<string> = new BehaviorSubject<string>("");
  name: any = "";
  subject! : Subscription;  
  produitSelected: Produit[] = [];
  count : number = 1;
  prix : number = 0;
  discount:any = 1;

  constructor(private route: Router, private activeRoute: ActivatedRoute, private produitservice: ProduitService) { }

  ngOnInit(): void {
    
    this.getProduit();
   
    
    
  }

  /*
  ajouter au panier
  */
  AjoutPanier(produit:Produit){
   
    let id = this.singleProduit.indexOf(produit);
    this.singleProduit[id].nbr = this.count; 
    this.produitservice.AjoutPanier(produit);
    this.produitservice.onReceive(produit.name+"("+produit.nbr+") ajouté au panier");
   
   setTimeout(() => {
    this.onBack();
  
   },1000);
    
  }
  ngOnDestroy() {
    this.subject.unsubscribe();
  }

 onBack(){
  this.route.navigate(['/produit']);

}

counter(){
 this.count ++; 
}

Dcounter(){
  if(this.count > 1){this.count --;}  
  
}
getProduit(){
  this.produitservice.getProduit().subscribe(
    (res: any) =>{ this.produitSelected = res; 
      
      this.subject = this.activeRoute.paramMap.subscribe( params => {
        this.id = params.get('id1');
       });
       
      /* Filtrer par nom*/
        this.singleProduit = this.produitSelected.filter(i => i._id === this.id); 
        
        this.singleProduit.forEach(produit => {
         
          this.discount = produit.discount;

          if(!produit.photo) return ;
          
          if(!produit.photo.includes('assets')){
            produit.photo = '/assets/img/upload/'+produit.photo;            
          }else{
            //produit.photo = produit.photo.substring(6);
          }
        })     
    },
    (err) => console.log(err)    
  )}

}
