import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Produit } from '../../model/produit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  title : string | null = null;
  produit : Produit[] = [];
  count : number = 1;
  newPrix: number = 1;

  constructor(
    
    @Inject(DIALOG_DATA) public data: { produit: any[]},
     public dialogRef : DialogRef<string>,
     private route : Router
     ) { }

  ngOnInit(): void {

    
  }
  
 //affiche allergene
    getAllergene(p : Produit){
    return p.allergene?.map(i => i.name)
    }

    //Affiche
    search(p:Produit){
      this.route.navigate(['details-produit/'+p._id])
      .then(() => {
        window.location.reload();
      });
      this.dialogRef.close();
    }
  }


