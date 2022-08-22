import { Subscription } from 'rxjs';
import { ProduitService } from './services/produit.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  messages : string = "";
  ajoutmessage : string = "";
  routes : any;
  affichemessage : boolean = true;
  subject! : Subscription;

  constructor(private produitservice : ProduitService, private route : Router){

   
  
  this.route.events.subscribe((event) => {
    if(event instanceof NavigationEnd){
      this.routes = event.url;
    }

    if(this.routes === "/panier"){
     
     this.affichemessage = false;
     this.produitservice.message.next("");
     
    }else{
      this.affichemessage = true;

    }
  });

   this.subject =  this.produitservice.message.subscribe((message: string)=>{
      this.messages = message;

     });
    
//@ViewChild('active') let active : ElementRef;

  }

  ngAfterViewInit (){
    //this.active.nativeElement.value = '<button>Panier</button>';
  }
 
  onDestroy(){
    this.subject.unsubscribe();
  }

}
