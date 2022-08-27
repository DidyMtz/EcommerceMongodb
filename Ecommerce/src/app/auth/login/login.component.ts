import { Router } from '@angular/router';
import { Personne } from '../../personne';
import { AuthService } from './../../services/auth.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  title : string | null = null ;
  LoginForm! : FormGroup;
  

  constructor(
      private auth : AuthService, 
      public modalRef : MdbModalRef<LoginComponent>, 
      private formbuid : FormBuilder,
      private route: Router
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

    let client = new Personne();
    client = this.LoginForm.value;
    client.etat = true;
    this.auth.isConnected(client);
    sessionStorage.setItem("email", client.email);
   this.route.navigate(['/produit'])
   .then(()=>{
      window.location.reload();
    });
    this.modalRef.close();
  }

}
