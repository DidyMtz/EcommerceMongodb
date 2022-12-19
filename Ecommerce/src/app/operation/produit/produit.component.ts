import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProduitService } from 'src/app/services/produit.service';

import { Dialog } from '@angular/cdk/dialog';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Produits } from 'src/app/model/produits';
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

  constructor(private produitservice: ProduitService, public dialog : Dialog) { }

  ngOnInit(): void {
    this.getProduit();
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
