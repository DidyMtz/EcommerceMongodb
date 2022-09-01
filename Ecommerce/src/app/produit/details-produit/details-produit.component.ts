import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Produit } from '../../modal/produit';

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

  constructor(private route: Router, private activeRoute: ActivatedRoute, private produitservice: ProduitService) { }

  ngOnInit(): void {
    this.produitSelected = this.produitservice.produits;
    this.subject = this.activeRoute.paramMap.subscribe( params => {
     // this.id = params.get('id');
      this.name = params.get('id1');



    });
   /* Filtrer par nom*/
    
    this.singleProduit = this.produitSelected.filter(i => i.name === this.name);
    //console.log(this.singleProduit);
    
    
  }

  AjoutPanier(produit:Produit){
   
    let id = this.singleProduit.indexOf(produit);
    this.singleProduit[id].nbr = this.count; 
    this.produitservice.AjoutPanier(produit);
    this.produitservice.onReceive(produit.name+"("+produit.nbr+") ajouté au panier");
   
    this.onBack();
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



}
