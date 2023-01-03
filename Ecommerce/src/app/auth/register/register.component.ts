import { DatasharingService } from 'src/app/services/datasharing.service';
import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Personne } from 'src/app/model/personne';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
//import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  displayEnregistrer: boolean = true;
  displayLogin: boolean = false;
  message: string = '';
  addform!: FormGroup;
  client: Personne = new Personne();
  isConnected: boolean = true;
  //private map : google.maps.Map

  constructor(private dialog: Dialog, private authservice: AuthService, private datasharingservice: DatasharingService) {}

  ngOnInit(): void {
    this.initForm();
    this.datasharingservice.isUserLoggedIn.subscribe(value => {
      this.isConnected = value;
    });
  
  }

  initForm() {
    this.addform = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      etat: new FormControl('off', Validators.required),
      adresse: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      codepostal: new FormControl('', Validators.required),
      reference: new FormControl(''),
      role: new FormControl('', Validators.required),
    });
  }
  close() {
    this.dialog.closeAll();
  }
  submit() {
    //console.log(this.addform.value);
    if (this.addform.valid)
      this.authservice.registerUser(this.addform.value).subscribe(
        (res: any) => {
          this.message = res.message;
          this.addform.reset();
        },
        (err) => console.log(err)
      );
  }

 
  enregistrer(){}
}
