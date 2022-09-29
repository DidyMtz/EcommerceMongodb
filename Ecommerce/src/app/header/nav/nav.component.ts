import { Dialog } from '@angular/cdk/dialog';
import { AuthService } from '../../services/auth.service';
import { Personne } from '../../modal/personne';
import { LoginComponent } from '../../auth/login/login.component';
import { Produit } from '../../modal/produit';
import { ProduitService } from '../../services/produit.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../search/modal.component';



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
  produit : any[] = [];
  message : string | null = null;
  client : Personne = new Personne();
  tel : string = "Commander par Téléphone";

  constructor(
    private activatedroute :ActivatedRoute, 
    private auth: AuthService,
    public dialog : Dialog,
    private route:Router, private produitservice: ProduitService) {
    
   }

  ngOnInit(): void {

   this.getProduit();
   
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

  changeMessage(){
    this.tel = " Contact : 0661192405";
   
    //permet de recueillir stat sur appel par tel
  }
  getProduit(){
    this.produitservice.getProduit().subscribe(
      (res:any) => {
        this.produit = res;
        this.produit.forEach(p => {
          if(!p.photo.includes('assets')){
            p.photo = '/assets/img/upload/'+p.photo;
          }else{
            p.photo = p.photo.substring(6);
          }
         
        });
      },
      (err) => console.log(err)
      
    )
  }
  goTo(destination:string){
        
    this.route.navigate([destination]);
  }  

  openModal(item: string) {

    if(!item || item.length < 5) return

    this.search = this.produit.filter(i => (i.name.toLowerCase()).includes(item.toLowerCase()));

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
