import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Produit } from '../produit';
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

  constructor(public modalRef: MdbModalRef<ModalComponent>, private route : Router) { }

  ngOnInit(): void {

    
  }
  
    search(p:Produit){
      this.route.navigate(['details-produit/'+p.name]);
      this.modalRef.close();
    }
  }


