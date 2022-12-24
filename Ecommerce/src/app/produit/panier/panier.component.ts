import { RegisterComponent } from './../../auth/register/register.component';
import { Dialog } from '@angular/cdk/dialog';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Personne } from '../../model/personne';
import { Produit } from 'src/app/model/produit';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit{

  panier   : any[]   = [];
  somme    : number  = 0;
  count    : number  = 0;
  nbr_article: number = 0;
  client   : Personne = new Personne();
  message  : string | null = null;
  shipping : number = 0;
  promo    : any[]  = [];
  messagePromo   : string = "";
  codePromo      : string = "";
  allergene      : any[]  = [];
  validPromo     : boolean = false;
  discountPromo  : number  = 0;
  discountGeneral: number  = 0;
  sommeGeneral   : number  = 0;
  isConnected    : boolean = false;
  listproduit    : string  = "";
  mymodal        : string  = 'form register';

  constructor( 
    private dialog : Dialog,
    private produitservice: ProduitService, private auth:AuthService, private route:Router) { }


  ngOnInit(): void {

    this.isConnected = this.auth.isConnected();
    
    /* remplir promo */
    this.promo = this.produitservice.promo;

    /* recup valeur frais shipping */
    this.shipping = this.produitservice.shipping;
    /* remplir panier*/
    this.panier = this.produitservice.panier;
    
    this.getSomme();
  }

    /* supprimer élément du panier*/
  supprimer(produit: Produit){

   this.panier = this.produitservice.ViderPanier(produit);
    
    this.getSomme();
  }

  getSomme(){
   
    /* calcul somme des achats*/
    this.somme = this.produitservice.panier.reduce((s,p)=> { 
      if(p.nbr !== undefined && p.discount !== undefined){
        s = s + p.prix * p?.nbr - p.prix * p?.nbr * (p?.discount/100)
      }
      return s;
    },0);
        
    /*somme generale avec discount du code Promo */
    this.sommeGeneral = this.somme - this.somme * this.discountPromo;

    this.nbr_article = this.produitservice.panier.length;
    if(this.nbr_article === 0) { this.message = "vide";}

    
  }
  
 onBack(){
  this.route.navigate(['/produit']);
}

RecupPromoCode(event: any){
  
 // reste condition validité de date
  let date = new Date();
  let fdate = date.getTime(); 
 
 this.validPromo = this.promo.some((i) => {return i.code === event.target.value.toUpperCase()});
 
 if(!this.validPromo){
  this.messagePromo = "INVALID PROMO";

 }else{
 this.promo.some((i)=> {if(i.code === event.target.value.toUpperCase()) this.discountPromo = i.discount; });
 //console.warn("discountpromo "+ this.discountPromo);
 this.sommeGeneral = this.sommeGeneral - this.sommeGeneral * this.discountPromo;
  this.messagePromo =" Discount de "+this.discountPromo * 100 +"% accordé ! ";
 } 
  }
  
RecupAllergene(event: any){
 this.produitservice.allergene.push(event.target.value);
}  

commander(){
  /*
  this.allergene = ""
  codepromo%=""
  montantpaiement
*/
const modalref = this.dialog.open(RegisterComponent, {
panelClass:"my-dialog",
data : { allergene : "", promo:"", montant:""}
})

}

}
