import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  messages: string = "";
  affichemessage: boolean = true;
  subject!: Subscription;
  routes: any;

  constructor(private produitservice: ProduitService, private route: Router) { }

  ngOnInit(): void {

    /*
      affiche le message panier partout sauf sur la page panier
    */

    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routes = event.url;
      }

      if (this.routes === "/panier") {

        this.affichemessage = false;
        // this.produitservice.message.next("");

      } else {
        this.affichemessage = true;
        setTimeout(() => {
          this.affichemessage = false;
        }, 40000)

      }
    });
    this.subject = this.produitservice.message.subscribe((message: string) => {
      this.messages = message;

    });
  }
   /* mettre à jour message panier */
   
  AfficherPanier() {
    this.route.navigate(['/panier']);
  }
/*
destroy subject */
  onDestroy() {
    this.subject.unsubscribe();
  }

}
