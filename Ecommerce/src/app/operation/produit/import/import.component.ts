import { ImportExportService } from './../../../services/import-export.service';
import { ProduitService } from 'src/app/services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produits } from 'src/app/modal/produits';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  fileName : string ="";
  message!: string;  
  json : any;
  allUsers!: Observable<Produits[]>; 
  excel: any[] = [];
  
  
  constructor(private produitservice: ProduitService,private excelService:ImportExportService,private http: HttpClient) {
   
    
  }  
    

   


  ngOnInit(): void {

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

 excelToJson(event:any){
  const file:File = event.target.files[0];
console.log(file);

  if (file) {

  this.fileName = file.name;
  console.log(this.fileName);
  
  this.excelService.excelToJson(this.fileName).forEach(elt=>{

    console.log(elt);
    
  })

  }else { console.log("no file")};
 }


  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  loadAllUser() {  
    this.allUsers = this.produitservice.BindUser();  
  }  





  
  
}
