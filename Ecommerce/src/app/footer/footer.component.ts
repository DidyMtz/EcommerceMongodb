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

  
  messages : string = "";
  affichemessage : boolean = true;
  subject! : Subscription;
  routes : any;

  constructor(private produitservice : ProduitService, private route : Router) { }

  ngOnInit(): void {
    
    
  this.route.events.subscribe((event) => {
    if(event instanceof NavigationEnd){
      this.routes = event.url;
    }

    if(this.routes === "/panier"){
     
     this.affichemessage = false;
     this.produitservice.message.next("panier");
     
    }else{
      this.affichemessage = true;

    }
  });
   this.subject =  this.produitservice.message.subscribe((message: string)=>{
    this.messages = message;

   });
  }
  
  onDestroy(){
    this.subject.unsubscribe();
  }

}
