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
  modalRef2 : MdbModalRef<ModalAlertComponent> | null = null;
  routes: string = "";
  hideCarousel : boolean = false;


  constructor(private produitservice : ProduitService, private route : Router, private modalservice : MdbModalService) { }

  ngOnInit(): void {
  
  /* Remplissage provisoire carousel produit favoris */
  this.carousel.push(this.produitservice.carousel.reverse());
   
  /* recuperer route 

  
    this.route.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.routes = event.url;
      }
      if(this.routes.includes('details'))
      { this.hideCarousel = true;}else{ this.hideCarousel = false;}
      
    });*/

  }

  /* Afficher modal */
  AfficheModalAlert(p: Produit){

   /* if(this.routes.includes('panier')){
      let id = p.name;
      this.route.navigate(['/details-produit/'+id])
    }else{}*/
      this.modalRef2 = this.modalservice.open(ModalAlertComponent, {
        modalClass:'modal-dialog modal-xl',
        data : { title:"Alerte", produit : p}
      });  
    

        
  }
  
  
}
