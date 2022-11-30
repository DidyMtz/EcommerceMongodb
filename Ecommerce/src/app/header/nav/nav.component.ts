import { Dialog } from '@angular/cdk/dialog';
import { AuthService } from '../../services/auth.service';
import { Personne } from '../../model/personne';
import { Produit } from '../../model/produit';
import { ProduitService } from '../../services/produit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../search/modal.component';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';



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
  isAdmin : boolean = false;
  role : string = "";
  search : Produit[] = [];
  produit : any[] = [];
  message : string | null = null;
  client : Personne = new Personne();
  tel : string = "Commander par Téléphone";
  
  LoginForm! : FormGroup;
  
  constructor(
    private activatedroute :ActivatedRoute, 
    private authservice: AuthService,
    public dialog : Dialog,
    private route:Router,private formBuild:FormBuilder, 
    private produitservice: ProduitService) {
    
   }

  ngOnInit(): void {


  this.initForm();
  this.login();
  this.getProduit();
    /* Verifie l url en cours et affiche selon condition

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
*/

  }

  

  changeMessage(){
    
    //permet de recueillir stat sur appel par tel
    this.tel = " Contact : 0661192405";
   
  }

  //recuperer la liste des produits
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

  //recherche affiche un modal
  openModal(item: string) {

    if(!item || item.length < 5) return ;

    this.search = this.produit.filter(i => (i.name.toLowerCase()).includes(item.toLowerCase()));

    const modalRef = this.dialog.open(ModalComponent, {
      panelClass: 'my-dialog',
      data : { produit : this.search}
    });
    
  }

  //initiliser le reactive formulaire
  initForm(){

    this.LoginForm = new FormGroup(
      { email : new FormControl(),
        password : new FormControl()
      }
    );
  
   this.LoginForm = this.formBuild.group(
      { email : ['',[Validators.email, Validators.required]],
       password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    );
   }
  
   //se logguer
    login(){
      
     const client = this.LoginForm.value;
          
      //if(!client.email || !client.password) return ;
      if(!this.LoginForm.valid) return ;
      this.authservice.loginUser(client).subscribe(
        (res:any) => {
          this.role = res.role;
          this.message = res.message;
          this.islogged = true;
          //verifier le role
          if(this.role === "admin"){
            this.isAdmin = true;
          }else{ this.isAdmin = false;}
      
      sessionStorage.setItem("token", res.token);
     
        },
       (err) => {
        
        if(err instanceof HttpErrorResponse){

          if(err.status === 400){
            this.message="Désolé problème email ou mot de passe"
          }else  this.message = err.message;
        }
        }
      )
  
    
  
    }
  
    //se delogguer
  logout(){
    sessionStorage.removeItem("email");
    sessionStorage.clear();
    this.islogged = false;
  }

  
//forcer le refresh de la page /fonction non utilisée
reloadPage(){
  
  this.route.routeReuseStrategy.shouldReuseRoute = () => false;
  this.route.navigate(['/produit'], {
   relativeTo : this.activatedroute,
   queryParamsHandling : "merge"
  });
}

  







}
