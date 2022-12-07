import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Produits } from 'src/app/model/produits';
import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ProduitService } from 'src/app/services/produit.service';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-modalmodifproduit',
  templateUrl: './modalmodifproduit.component.html',
  styleUrls: ['./modalmodifproduit.component.scss']
})
export class ModalmodifproduitComponent implements OnInit {

  allergeneList :any[] = [];
  listCategorie : any[] = [];
  message:string ="";
  newphoto:string ="";

  constructor(
    @Inject(DIALOG_DATA) public data: { produit: Produits},
    private dialogRef: DialogRef,
    private produitservice : ProduitService,
    private categorieservice : CategorieService 
  ) { }

  ngOnInit(): void {
    this.allergeneList = this.produitservice.allergene;
     this.categorieservice.getCategorie().subscribe(
      (data:any)=> this.listCategorie = data,
      (err)=> console.log(err)      
    );
    
  }

  submit(){
   
   
    /*if(!this.data.produit.photo.includes("assets")){
      this.data.produit.photo = "/assets/img/upload/"+this.data.produit.photo;
    }*/
    console.log(this.data.produit);
    if(this.data.produit.allergene.length < 1){
      this.data.produit.allergene.push("néant");
    }
    
    this.produitservice.editProduit(this.data.produit).subscribe(
      (res: any) => {
        console.log(res);
        this.message = res.message; 
      },
      (err) => console.log(err)
    )
    
  }
  onFileChange(event:any){
    this.data.produit.photo = event.target.files[0].name; 
    if(event != null)
    this.produitservice.onFileSelected(event,this.data.produit.photo)?.subscribe(
      (res:any) => { this.message = res.message; this.newphoto = "assets/img/upload/"+res.filename;},
      (err) => {this.message = err}     
    )
  
  }
}
