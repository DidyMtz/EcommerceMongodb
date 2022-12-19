import { ProduitService } from 'src/app/services/produit.service';
import { CategorieService } from './../../services/categorie.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produits } from 'src/app/model/produits';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  listCategorie: any[] = [];
  addform!: FormGroup;
  display: boolean = false;
  displayedColumns = ['photo', 'name', 'prix', 'description', 'allergene', 'favori', 'categorie', 'discount', 'operation'];
  allergeneList: string[] = [];
  selected: any;
  message: string | null = null;
  newphoto: string | null = null;
  photoName: string = "";

  constructor(private categorie: CategorieService, private produitservice: ProduitService) { }


  ngOnInit() {
    this.getCategorie();
    this.formInit();
    this.allergeneList = this.produitservice.allergene;


  }
  displayAddForm() {
    this.display = true;
  }
  hideAddForm() {
    this.display = false;
  }
  /*
  intialise form 
   */
  formInit() {
    this.addform = new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      photo: new FormControl("", Validators.required),
      allergene: new FormControl(""),
      favori: new FormControl("", Validators.required),
      prix: new FormControl("", Validators.required),
      discount: new FormControl("", Validators.required),
      categorie: new FormControl("", Validators.required)
    });
  }
  /*
  get list categorie from database mongoose
  */
  getCategorie() {
    this.categorie.getCategorie().subscribe(
      (data: any) => { this.listCategorie = data; },
      (err) => { console.log(err); }
    )
  }


  /*
    submit form
    */
  submit() {
    if (this.addform.invalid) return;

    const produit = this.addform.value;
    produit.photo = this.photoName;

    this.produitservice.postProduit(produit).subscribe(
      (res: any) => {
        this.message = res.message;
        this.addform.reset();

      },
      (err: any) => { console.log(err); }
    )

  }

  onFileUpload(event: any) {

    this.photoName = event.target.files[0].name;
    const type = event.target.files[0].type;
    const size = event.target.files[0].size;

    if (size > 270000) {
      this.message = "la taille du fichier est trop grande";
    }
    if (type !== "image/jpeg" && type !== "image/jpg" && type !== "image/png") {
      alert("Désolé ce type d'image est interdit");

    } else {

      if (event != null)
        this.produitservice.onFileSelected(event, this.photoName)?.subscribe(
          (res: any) => { this.message = res.message; this.newphoto = "assets/img/upload/" + res.filename; },
          (err) => { this.message = err }
        )
    }


  }
}
