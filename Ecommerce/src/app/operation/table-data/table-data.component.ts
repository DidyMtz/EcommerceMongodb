import { ModalmodifproduitComponent } from '../produit/modalmodifproduit/modalmodifproduit.component';
import { AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Produits } from 'src/app/model/produits';
import { ProduitService } from 'src/app/services/produit.service';
import { TableDataDataSource } from './table-data-datasource';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Produits>; 
  
  dataSource: TableDataDataSource;
  prix! :any;
  listProduit: any[] = [];
  produit = {};
  message:string ="";


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['photo', 'name', 'prix', 'description', 'allergene', 'favori', 'categorie', 'discount', 'operation'];

  constructor(private produitservice: ProduitService, public dialog : Dialog) {

    this.dataSource = new TableDataDataSource(produitservice);

  }
ngOnInit(): void {
  
}

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }
/*
test update data in table
*/
  onChange(event:any, p:Produits){

   // console.log(event.target.value);
    //console.log(event.target.name);
    const nom = event.target.name;
    if(nom==="prix"){
      p.prix = event.target.value;
    }
    if(nom==="allergene"){
      p.allergene = event.target.value;
    }
    console.log(p);
    
    
  }
  update( p: any) {
   
   const modalRef = this.dialog.open(ModalmodifproduitComponent, {
    panelClass: 'my-dialog',
    data : { produit : p}
  }); 
   
  }
  delete(p: Produits) {
   
    const id = p._id;
    this.produitservice.supprimerProduit(id).subscribe(
      (res:any) => this.message = res.message,
      (err) => console.log(err)
      
    )
  }


}
