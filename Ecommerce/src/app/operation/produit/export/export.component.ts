import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produits } from 'src/app/modal/produits';
import { HttpClient } from '@angular/common/http';
import { ImportExportService } from './../../../services/import-export.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  json : any;
  allProduits!: Observable<Produits[]>; 
  excel: any[] = [];
  
  constructor(private produitservice: ProduitService,private excelService:ImportExportService,private http: HttpClient) { }

  ngOnInit(): void {

    /* afficher data */
    this.produitservice.BindUser().subscribe(data => {  
      data.forEach((row:any) => {  
        this.excel.push(row);  
      });  
     });  
    this.loadAllUser(); 
  }

  exportAsXLSX():void {  
    this.excelService.exportAsExcelFile(this.excel, 'sample');  
 }  



 loadAllUser() {  
  this.allProduits = this.produitservice.BindUser();  
}  







}
