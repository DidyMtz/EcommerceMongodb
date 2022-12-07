import { ProduitService } from 'src/app/services/produit.service';
import { CategorieService } from './../../services/categorie.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  allergeneList : string[] =[];
  constructor(private categorie: CategorieService, private produitservice: ProduitService) { }
  selected: any;
 
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
      discount: new FormControl(""),
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
    if (this.addform.valid)
      console.log(this.addform.value);

    //this.addform.value = "";

  }
}
