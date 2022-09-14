import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';  
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';  
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';  
const EXCEL_EXTENSION = '.xlsx'; 


@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  API_ExcelfileUpload = environment.API_url+"/posts/uploadexcel";
  
  constructor(private http : HttpClient) { }


    /*export to excel*/
  public exportAsExcelFile(json: any[], excelFileName: string): void {  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);  
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    this.saveAsExcelFile(excelBuffer, excelFileName);  
  }  
  private saveAsExcelFile(buffer: any, fileName: string): void {  
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});  
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);  
  }  

  
  postUploadexcel(formdata : FormData){
    return this.http.post(this.API_ExcelfileUpload, formdata);
   }

onFileSelectedxlsx(event :any, fileName: any) {

  const file:File = event.target.files[0];
  if (file) {
      fileName = file.name;
      const formData = new FormData();
      formData.append("excelFile", file);
      const upload$ = this.postUploadexcel(formData);
     return upload$;
     
  }else{ return ;}
}





}