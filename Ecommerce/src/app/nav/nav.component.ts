import { AuthService } from './../services/auth.service';
import { Personne } from './../personne';
import { LoginComponent } from './../auth/login/login.component';
import { Produit } from './../produit';
import { ProduitService } from './../services/produit.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  
  modalRef: MdbModalRef<ModalComponent> | null = null;
  active: any | null = null;
  classe : boolean = false;
  currentRoute :string | null = null;
  islogged: boolean = false;
  search : Produit[] = [];
  message : string | null = null;
  client : Personne = new Personne();

  constructor(private auth: AuthService, private modalService: MdbModalService, private route:Router, private produitservice: ProduitService) {
    
   }

  ngOnInit(): void {

   // Verifie l url en cours et affiche selon condition

    this.route.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
            
            if(this.currentRoute !=='/produit'){
              this.classe = false;
            }else{
              this.classe = true;
            }
      }
  });
     if(sessionStorage.getItem("email") != null) {
      this.islogged = true;
     }

  }

  goTo(destination:string){
        
    this.route.navigate([destination]);
  }  

  openModal(item: string) {

    this.search = this.produitservice.produits.filter(i => (i.name.toLowerCase()).includes(item.toLowerCase()));

    this.modalRef = this.modalService.open(ModalComponent, {
      modalClass: 'modal-dialog-centered modal-lg',
      data : {title : "Resultat de recherche", produit : this.search}
    });
  }

  openModallogin(){

      this.modalRef = this.modalService.open(LoginComponent, {
        animation: true,
        containerClass:'modal-side modal-bottom-right',
        modalClass : 'modal-dialog',
        data : { title : "Authentification"}
      })
  }

  logout(){
    sessionStorage.removeItem("email");
    sessionStorage.clear();
    this.route.navigateByUrl("/produit")
    .then(() => {
      window.location.reload();
    })
  }

  







}
