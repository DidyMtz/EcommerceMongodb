import { ModalAlertComponent } from './../modal-alert/modal-alert.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProduitService } from './../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../produit';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-carousel-footer',
  templateUrl: './carousel-footer.component.html',
  styleUrls: ['./carousel-footer.component.scss']
})
export class CarouselFooterComponent implements OnInit {

  carousel : any[] = [];
  routes : string ="";
  count : number = 1;
  modalRef2 : MdbModalRef<ModalAlertComponent> | null = null;
  isPanierpage : boolean = false;


  constructor(private produitservice : ProduitService, private route : Router, private modalservice : MdbModalService) { }

  ngOnInit(): void {
  
    
  this.carousel.push(this.produitservice.carousel.reverse());
   

  }


  displaydetails(produit: Produit){

    let name = produit.name;   
    this.route.navigate(['/details-produit/'+name]);
  }

  AjouterPanier(p: Produit){

    p.nbr = 1;
   // this.produitservice.AjoutPanier(p);
    this.modalRef2 = this.modalservice.open(ModalAlertComponent, {
      modalClass:'modal-dialog modal-xl',
      data : { title:"Alerte", produit : p}
    });

    
  }
  
  
}
