import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProduitService } from 'src/app/services/produit.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produits } from 'src/app/model/produits';
import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CategorieService } from './../../services/categorie.service';
import { MatTableDataSource } from '@angular/material/table';
import { ModalmodifproduitComponent } from './modalmodifproduit/modalmodifproduit.component';
import { ModalsupprproduitComponent } from './modalsupprproduit/modalsupprproduit.component';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

 
  @Input() isAdmin : boolean = false ;
  @ViewChild(MatPaginator) paginator !: MatPaginator ;
  @ViewChild(MatSort) sort !: MatSort ;
  displayedColumns: string[] = ['photo', 'name', 'prix', 'description', 'allergene', 'favori', 'categorie', 'discount', 'action'];
  dataSource : any;  
  prix! :any;
  listProduit: any[] = [];
  produit = {};
  message:string ="";
  messages:string ="";
  isDisabled: boolean = false;
  listCategorie: any[] = [];
  addform!: FormGroup;
  display: boolean = false; allergeneList: string[] = [];
  selected: any;
  newphoto: string | null = null;
  photoName: string = "";

  constructor(private produitservice: ProduitService, public dialog : Dialog,private categorie: CategorieService) { }

  ngOnInit(): void {
    this.getProduit();
    this.getCategorie();
    this.formInit();
    this.allergeneList = this.produitservice.allergene;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getProduit(){
    this.produitservice.getProduit().subscribe(
      (data:any) => {
        this.dataSource = data;
        this.dataSource = new MatTableDataSource<Produits>(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      })
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
        this.getProduit();      

      },
      (err: any) => { console.log(err); }
    )

  }

  onFileUpload(event: any) {

    this.photoName = event.target.files[0].name;
    const type = event.target.files[0].type;
    const size = event.target.files[0].size;

    if (size > 270000) {
      this.messages = "la taille du fichier est trop grande";
      this.addform.get('name')?.disable();
      
    }
    if (type !== "image/jpeg" && type !== "image/jpg" && type !== "image/png") {
      alert("Désolé ce type d'image est interdit");
      this.addform.get('name')?.disable();

    } else {
      this.addform.get('name')?.enable();
      this.messages ="";
      if (event != null)
        this.produitservice.onFileSelected(event, this.photoName)?.subscribe(
          (res: any) => { this.message = res.message; this.newphoto = "assets/img/upload/" + res.filename; },
          (err) => { this.message = err.message }
        )
    }


  }
/*
test update data in table
*/
onChange(event:any, p:Produits){

  if(!event) return;
   const nom = event.target.name;
   if(nom==="prix"){p.prix = event.target.value; }
   if(nom==="allergene"){
     p.allergene = event.target.value;
   }
   
   
 }
 update( p: any) {
  
  const modalRef = this.dialog.open(ModalmodifproduitComponent, {
   panelClass: 'my-dialog',
   data : { produit : p}
 }); 
  
 }
 delete(p: Produits) {
  
  const modalref = this.dialog.open(ModalsupprproduitComponent, {
    panelClass: 'my-dialog',
    data : { produit : p}
  })
  
 }




}
