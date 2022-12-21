import { CategorieService } from './../../services/categorie.service';
import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../../model/produit';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-affiche-produit',
  templateUrl: './affiche-produit.component.html',
  styleUrls: ['./affiche-produit.component.scss']
})
export class AfficheProduitComponent implements OnInit {

  listProduit: any[] = [];
  message: string = '';
  categorie: any[] = [];
  listcategorie: any[] = [];
  promotion: any[] = [];
  prixDiscount: number = 0;

  constructor(
    private route: Router,
    private produitservice: ProduitService,
    private categorieservice: CategorieService
  ) { }

  ngOnInit(): void {

    this.getProduits();

  }

  getProduits() {
    this.produitservice.getProduit().subscribe(
      (res: any) => {
        this.listProduit = res;
        this.promotion = this.listProduit.filter((i) => i.discount != 0);

        this.listProduit.forEach(produit => {

          if (!produit.photo) return;

          if (!produit.photo.includes('assets')) {
            produit.photo = '/assets/img/upload/' + produit.photo;
          } else {
            //produit.photo = produit.photo.substring(6);
          }
        })


        /* filtrer et créer array par categorie */
        this.categorieservice.getCategorie().subscribe(
          (data: any) => {
            this.listcategorie = data;

            this.listcategorie.forEach(elt => {
              if (this.listProduit != null)
                this.categorie.push(this.listProduit.filter((i) => i.categorie === elt.name));

            });
          },
          (err) => console.log(err)
        )

      },
      (err) => { console.log(err); }
    )
  }

  AfficherDetailsProduit(produit: Produit) {

    //this.produitservice.AjoutPanier(produit);
    //this.message = produit.name + " ajouté au panier";
    this.route.navigate(['details-produit/' + produit._id]);

  }

  getDiscount(produit: Produit) {
    if (!produit.discount) return null;
    return this.prixDiscount = Math.floor(produit.prix - produit.prix * produit.discount / 100);

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: false
  };
  produitOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['<span class="indicator">précedent</span>', '<span class="indicator">suivant</span>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }


}
