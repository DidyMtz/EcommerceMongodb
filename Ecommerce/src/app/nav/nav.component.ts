import { Dialog } from '@angular/cdk/dialog';
import { AuthService } from './../services/auth.service';
import { Personne } from './../personne';
import { LoginComponent } from './../auth/login/login.component';
import { Produit } from './../produit';
import { ProduitService } from './../services/produit.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  
  active: any | null = null;
  classe : boolean = false;
  currentRoute :string | null = null;
  islogged: boolean = false;
  search : Produit[] = [];
  message : string | null = null;
  client : Personne = new Personne();

  constructor(
    private activatedroute :ActivatedRoute, 
    private auth: AuthService,
    public dialog : Dialog,
    private route:Router, private produitservice: ProduitService) {
    
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

    const modalRef = this.dialog.open(ModalComponent, {
      panelClass: 'my-dialog',
      data : { produit : this.search}
    });
    
  }

  openModallogin(){

      const modalRef = this.dialog.open(LoginComponent, {
       
        panelClass : 'my-dialog',
        data : { title : "Authentification"}
      })
      
  }

  logout(){
    sessionStorage.removeItem("email");
    sessionStorage.clear();
   this.route.navigateByUrl("/")
    .then(() => {
      window.location.reload();
    });
  }

  

reloadPage(){
  
  this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  this.route.navigate(['/produit'], {
   relativeTo : this.activatedroute,
   queryParamsHandling : "merge"
  });
}

  







}
