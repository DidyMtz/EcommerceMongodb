import { AuthService } from './../../services/auth.service';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Produit } from '../../model/produit';
import { Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  title: string | null = null;
  produit: Produit[] = [];
  count: number = 1;
  newPrix: number = 1;

  constructor(
    @Inject(DIALOG_DATA) public data: { produit: any[] },
    public dialogRef: DialogRef<string>,
    private produitservice: ProduitService
  ) {}

  ngOnInit(): void {
    this.produitservice.panier.length;
  }


  //Affiche
  search(p: Produit) {
    /* this.route.navigate(['details-produit/'+p._id])
      .then(() => {
        window.location.reload();
      });
      */
    this.produitservice.AjoutPanier(p);
    this.dialogRef.close();
  }
  Dcounter(p: Produit) {
    if (this.count > 1) {
      this.count--;
      p.nbr = this.count;
    }
  }
  counter(p: Produit) {
    this.count++;
    p.nbr = this.count;
  }
}
