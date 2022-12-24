import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Personne } from 'src/app/model/personne';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  message :string ="";
  addform!: FormGroup;
  client   : Personne = new Personne();
  isConnected    : boolean = true;
  
  constructor(private dialog: Dialog,private authservice: AuthService) { }

  ngOnInit(): void {
  }

  initForm() {
    this.addform = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      tel: new FormControl("", Validators.required),
      etat: new FormControl("off", Validators.required),
      adresse: new FormControl("", Validators.required),
      ville: new FormControl("", Validators.required),
      codepostal: new FormControl("", Validators.required),
      reference: new FormControl(""),
      role: new FormControl("", Validators.required)
    })
  }
  close(){
    this.dialog.closeAll()
  }
  submit() {
    console.log(this.addform.value);
    if (this.addform.valid)
      this.authservice.registerUser(this.addform.value).subscribe(
        (res: any) => {this.message = res.message;
            this.addform.reset();
        },
        (err) => console.log(err)
      )
      
  }
}
