import { ProduitService } from './../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {

  id!: any;
  singleProduit : any[] = [];

  constructor(private activeRoute: ActivatedRoute, private produitservice: ProduitService) { }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe( params => {
      this.id = params.get('id');

    });
    this.singleProduit = this.produitservice.produits.filter(i => this.produitservice.produits.indexOf(i) == this.id);
    //console.log( this.singleProduit);
    
  }


}
