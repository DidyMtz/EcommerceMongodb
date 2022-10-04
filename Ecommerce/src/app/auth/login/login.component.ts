import { Personne } from '../../modal/personne';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  title : string | null = null ;
  LoginForm! : FormGroup;
  message : string = "";
  @Output() role: string = "";
  @Output() isAdmin : boolean = false;
  @Output() isLogged : boolean = false;

  constructor(
      private authservice : AuthService, 
      private formbuid : FormBuilder,
      private route : Router
      ) { }

  ngOnInit(): void {
    this.initForm();
  }

 initForm(){

  this.LoginForm = new FormGroup(
    { email : new FormControl(),
      password : new FormControl()
    }
  );

 this.LoginForm = this.formbuid.group(
    { email : ['',[Validators.email, Validators.required]],
     password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    }
  );
 }

  login(){
    
   const client = this.LoginForm.value;
    console.warn(client);
    
    if(!client) return ;
    
    this.authservice.loginUser(client).subscribe(
      (res:any) => {
        this.role = res.role;
        this.message = res.message;

        //verifier le role
        if(this.role === "admin"){
          this.isAdmin = true;
        }else{ this.isAdmin = false;}

        /*
   this.route.navigate(['/produit'])
   .then(()=>{
      window.location.reload();
    });*/

      },
     (err) => this.message = err
    )
    sessionStorage.setItem("email", client.email);

  

  }


}
