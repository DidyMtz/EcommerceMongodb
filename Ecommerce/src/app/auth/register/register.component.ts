import { ProduitService } from 'src/app/services/produit.service';
import { DatasharingService } from 'src/app/services/datasharing.service';
import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Personne } from 'src/app/model/personne';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
//import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  message: string = '';
  infoPersonnel!: FormGroup;
  infoPaiement!: FormGroup;
  client: Personne = new Personne();
  isConnected: boolean = true;
  paiement:string = "";
  //private map : google.maps.Map
  modePaiement : any[] = [];
  
  
  isEditable = false;

  constructor(private produitservice: ProduitService,private _formBuilder: FormBuilder, private dialog: Dialog, private authservice: AuthService, private datasharingservice: DatasharingService) {}

  ngOnInit(): void {
    this.initForm();
    this.datasharingservice.isUserLoggedIn.subscribe(value => {
      this.isConnected = value;
    });

  this.modePaiement = this.produitservice.modepaiement;
  }

  initForm() {
    this.infoPersonnel = new FormGroup({
      nom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      etat: new FormControl('off', Validators.required),
      adresse: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      codepostal: new FormControl('', Validators.required),
      reference: new FormControl(''),
      role: new FormControl('utilisateur', Validators.required),
    });
    this.infoPaiement = new FormGroup({
      modepaiement: new FormControl('', Validators.required)
    })
  }
  close() {
    this.dialog.closeAll();
  }
  submit() {
    if (this.infoPersonnel.valid)
      this.authservice.registerUser(this.infoPersonnel.value).subscribe(
        (res: any) => {
          this.message = res.message;
         // this.infoPersonnel.reset();
        },
        (err) => console.log(err)
      );
  }

 /*
voir si use step obligatoire angular material
 apres details perso , afficher details finance, puis formulaire login
 */
  enregistrer(){

  }
}
