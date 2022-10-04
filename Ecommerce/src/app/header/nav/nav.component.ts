import { Dialog } from '@angular/cdk/dialog';
import { AuthService } from '../../services/auth.service';
import { Personne } from '../../modal/personne';
import { LoginComponent } from '../../auth/login/login.component';
import { Produit } from '../../modal/produit';
import { ProduitService } from '../../services/produit.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../search/modal.component';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';



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
  
    login(){
      
     const client = this.LoginForm.value;
          
      if(!client.email || !client.password) return ;
      
      this.authservice.loginUser(client).subscribe(
        (res:any) => {
          this.role = res.role;
          this.message = res.message;
          this.islogged = true;
  
          //verifier le role
          if(this.role === "admin"){
            this.isAdmin = true;
          }else{ this.isAdmin = false;}
  
          sessionStorage.setItem("email", client.email);
  
        },
       (err) => this.message = err
      )
  
    
  
    }
  
/*
  openModallogin(){

      const modalRef = this.dialog.open(LoginComponent, {
       
        panelClass : 'my-dialog',
        data : { title : "Authentification"}
      })
      
  }
*/
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
