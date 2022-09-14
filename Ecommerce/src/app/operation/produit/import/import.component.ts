import { Observable } from 'rxjs';
import { Produit } from './../../../modal/produit';

import { Component, Input, OnInit } from '@angular/core';
import { ImportExportService } from 'src/app/services/import-export.service';
import { ProduitService } from 'src/app/services/produit.service';

import * as XLSX from 'xlsx';  
import { Produits } from 'src/app/modal/produits';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';  
const EXCEL_EXTENSION = '.xlsx'; 

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  fileName : string ="";
  message!: string;  
  pathExcel : string ="";
  jsonFile : any;
  step = 0;
  
  
  constructor(private excelService:ImportExportService,  private produitservice: ProduitService,) {  }  
     


  ngOnInit(): void {

     
  }

  
  onFileSelected(event:any){
    if(event != null)

   this.fileName = event.target.files[0];
  //console.log(file);
    this.excelService.onFileSelectedxlsx(event,this.fileName)?.subscribe(
      (res:any) => { this.message = res.message;this.pathExcel = res.path, this.fileName = res.filename},
      (err) => {this.message = err}     
    )

  }

 excelToJson(){
  if (this.pathExcel) {

  this.convertExcelTojson();
 
  
 //this.produitservice.postProduit(jsonFile)

  }else { console.log("no file")};

  
 }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  convertExcelTojson(): any{
        // read Excel file and convert to json format using fetch
        
        const file = this.pathExcel.substring(6);
        let jsonFile;

        fetch(file)
        .then(function (res) {
          /* get the data as a Blob */
          if (!res.ok) throw new Error("fetch failed");
          return res.arrayBuffer();
        })
        .then(function (ab) {
          /* parse the data when it is received */
    
          var data = new Uint8Array(ab);
          var workbook = XLSX.read(data, {
              type: "array"
          });
        
          /* *****************************************************************
          * DO SOMETHING WITH workbook: Converting Excel value to Json       *
          ********************************************************************/
          var first_sheet_name = workbook.SheetNames[0];
          /* Get worksheet */
          var worksheet = workbook.Sheets[first_sheet_name];
        
        var _JsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      
       return _JsonData
        })
        .then(
          (res) =>{
            this.jsonFile = res;
            this.produitservice.postImport(this.jsonFile).subscribe(
              (res:any)=> { this.message += res.message},
              (error) =>{ this.message = error;}
            )
          } ,
          (err) => console.log(err)
        )
        
  }




  
  
}
