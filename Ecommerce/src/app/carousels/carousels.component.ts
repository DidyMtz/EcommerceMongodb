import { Router } from '@angular/router';
import { Produit } from 'src/app/model/produit';
import { ProduitService } from './../services/produit.service';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-carousels',
  templateUrl: './carousels.component.html',
  styleUrls: ['./carousels.component.scss']
})
export class CarouselsComponent implements OnInit {

  @Input() images: Produit[] = [];
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;//default interval slide

  message: string = "";
  selectedIndex = 0;

  constructor(private route: Router) { }
  

  ngOnInit(): void {
    if (this.autoSlide) {
      this.autoSlideImages();
    }

  }
  //autoslide dans carousel
  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval)
  }
  //defini l'index de l'image
  selectImage(index: number): void {
    this.selectedIndex = index;
  }

  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }
  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

  voirproduit(p: Produit) {
    const id = p._id;
    this.route.navigate(["details-produit", id]);
  }
  /*getProduits(){
    this.produitservice.getProduit().subscribe(
      (res: any) => {
        this.images = res;
        this.images.forEach(produit => {
         
          if(!produit.photo) return ;
          
          if(!produit.photo.includes('assets')){
            produit.photo = '/assets/img/upload/'+produit.photo;   
                     
          }else{
            produit.photo = produit.photo.substring(6);
          }
        })

        
      },
      (err) => {console.log(err);}      
    )
  }*/

}
