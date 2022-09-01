import { ModalAlertComponent } from './../modal-alert/modal-alert.component';
import {DialogModule, Dialog} from '@angular/cdk/dialog';
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
  routes: string = "";
  hideCarousel : boolean = false;


  constructor(
    private produitservice : ProduitService,
    private route : Router, 
    public dialog : Dialog
    ) { }

  ngOnInit(): void {
  
  /* Remplissage provisoire carousel produit favoris */
  this.carousel.push(this.produitservice.carousel.reverse());
   

  }

  /* Afficher modal */
  AfficheModalAlert(p: Produit){

     const dialogRef = this.dialog.open<Produit>(ModalAlertComponent, {
      panelClass: 'my-dialog',
        data : { produit : p}
      });  
    

        
  }
  
  
}
