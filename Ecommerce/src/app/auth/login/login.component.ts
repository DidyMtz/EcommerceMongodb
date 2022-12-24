import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Personne } from 'src/app/model/personne';
import { Produit } from 'src/app/model/produit';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() islogged: boolean = false;
  isAdmin: boolean = false;
  role: string = "";
  produit: any[] = [];
  message: string | null = null;
  client: Personne = new Personne();
  LoginForm!: FormGroup;
  
  constructor(private formBuild: FormBuilder,
    private authservice: AuthService) { }

  ngOnInit(): void {
    
    this.initForm();
    this.login();
  }

  //initiliser le reactive formulaire
  initForm() {

    this.LoginForm = new FormGroup(
      {
        email: new FormControl(),
        password: new FormControl()
      }
    );

    this.LoginForm = this.formBuild.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    );
  }

  //se logguer
  login() {
    this.message = "";

    const client = this.LoginForm.value;

    if (!this.LoginForm.valid) return;
    this.authservice.loginUser(client).subscribe(
      (res: any) => {
        this.role = res.role;
        this.message = res.message;
        this.islogged = true;
        sessionStorage.setItem("token", res.token);
        localStorage.setItem("email", client.email);

        //verifier le role
        if (this.role === "administrateur" && res.token) {
          this.isAdmin = true;
        } else { this.isAdmin = false; }
      },
      (err) => {

        if (err instanceof HttpErrorResponse) {

          if (err.status === 400) {
            this.message = "Désolé problème email ou mot de passe"
          } else this.message = err.message;
        }
      }
    )


  }

}
