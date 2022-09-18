import { Component, OnInit } from '@angular/core';
import { ImportExportService } from 'src/app/services/import-export.service';
import { ProduitService } from 'src/app/services/produit.service';

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
  uploadImgCompleted : boolean = false;
  
  
  constructor(private excelService:ImportExportService,  private produitservice: ProduitService,) {  }  
     


  ngOnInit(): void {}

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  
  onFileSelected(event:any){
    if(!event) return ;
    
   this.fileName = event.target.files[0];
  //console.log(file);
    this.excelService.onFileSelectedxlsx(event,this.fileName)?.subscribe(
      (res:any) => { this.message = res.message;this.pathExcel = res.path, this.fileName = res.filename},
      (err) => {this.message = err}     
    )

  }

 importCsv(){
  if (!this.pathExcel) {this.message = "no file";} 
  else{ const file = this.pathExcel.substring(6);
    this.produitservice.postImport(file).subscribe(
      (res:any)=> { 
         this.message += res.message; 
         this.uploadImgCompleted = false;
        },
      (error) =>{ this.message = error;}
    )} 
 }

 importMultipleimg(event:any){

  if(!event) return ;

   const uploadmulti = this.produitservice.onFileSelectedmultiImg(event);
   uploadmulti?.subscribe(
      (res : any) => {
        this.message = res.message; 
        this.uploadImgCompleted = true;
      },
      (err) => this.message = err
    )
 
}




  
  

}