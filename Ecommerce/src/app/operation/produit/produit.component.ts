
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

 
  @Input() isAdmin : boolean = false ;

  constructor() { }

  ngOnInit(): void {
  
    
    
  }

  





}
