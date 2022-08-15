import { ProduitService } from './../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affiche-produit',
  templateUrl: './affiche-produit.component.html',
  styleUrls: ['./affiche-produit.component.scss']
})
export class AfficheProduitComponent implements OnInit {

  listProduit: any[] = [];

  constructor(private route: Router, private produitservice: ProduitService) { }

  ngOnInit(): void {

    this.listProduit = this.produitservice.produits;
  }

  display(id:number){

    this.route.navigate(['/details-produit/'+id]);
  }
}
