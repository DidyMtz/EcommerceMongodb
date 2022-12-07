import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produit } from '../model/produit';
import { Produits } from '../model/produits';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  count: number = 1;
  shipping: number = 0;
  message : BehaviorSubject<string> = new BehaviorSubject<string>("");
  API_postproduit = environment.API_url+"/posts/";
  API_postimportproduit = environment.API_url+"/posts/import";
  API_imageUpload = environment.API_url+"/posts/upload";
  API_multiImgUpload = environment.API_url+"/posts/uploadmultipleimg";
  API_getproduit = environment.API_url+"/posts/";
  API_getOneproduit = environment.API_url+"/posts/:produitID";
  API_editProduit = environment.API_url+"/posts/update";
  API_editphotoProduit = environment.API_url+"/posts/updatephoto";
  API_editallergeneProduit = environment.API_url+"/posts/updateallergene";
  API_deleteProduit = environment.API_url+"/posts/delete";
  API_deleteimgProduit = environment.API_url+"/posts/deleteimg";
  

  
  
  promo : any[] = [
    {code : 'AAVV', datefin: '29/8/2022', discount: .1 },
    {code : 'BBHH', datefin: '28/8/2022', discount: .2 },
    {code : 'XXYY', datefin: '29/8/2022', discount: .3 }
  ];
  produits : any[] = [];
  /*produitss : any[] = [
    
    {name:'Allocco ', prix: 20, photo:'../../assets/img/alloco.jpg', description:'Alloco grillé sur feu doux à la sauce de persil et mouscade.', categorie:'Accompagnement', discount:.5},
    {name:'Poulet Braisé', prix: 100, photo:'../../assets/img/Poulet-Braise.jpg', description:'Poulet braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal', discount:0},
    {name:'Poisson Braisé', prix: 90, photo:'../../assets/img/slider/fish1.jpg', description:'Poisson braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal', discount:0},
    {name:'Chèvre Braisée', prix: 120, photo:'../../assets/img/croupions-de-dindes.jpeg', description:'Chèvre braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal', discount:.5},
    {name:'Porc Braisé', prix: 120, photo:'../../assets/img/mouton-braisé.jpg', description:'Porc braisé sur feu doux à la sauce de persil. Excellent plat pour plusieurs.', categorie:'Plat principal',discount:.5},
    {name:'Brochette Boeuf', prix: 110, photo:'../../assets/img/brochettes-de-boeuf-recette.jpeg', description:'Brochettes braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal', discount:0},
    {name:'Frites', prix: 20, photo:'../../assets/img/frites.jpeg', description:'Frites croustillantes, dorées à feu doux. Excellent pour vos plats.', categorie:'Accompagnement', discount:.1},
    {name:'Manioc', prix: 20, photo:'../../assets/img/kwanga.jpg', description:'Manioc, chikwangue. Accompagnement pour vos plats.', categorie:'Accompagnement', discount:0},
    {name:'Riz', prix: 30, photo:'../../assets/img/slider/fried-rice1.jpg', description:'Riz basmati. Accompagnement de luxe pour vos plats.', categorie:'Accompagnement', discount:0},
    {name:'Jus de bissap', prix: 20, photo:'../../assets/img/jus de bissap.jpeg', description:'Jus de bissap, Accompagnement de luxe pour vos plats.', categorie:'Boisson', discount:0},
    {name:'Boeuf barbecue', prix: 110, photo:'../../assets/img/slider/barbecue-1239434_1280.jpg', description:'Boeuf barbecue sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal', discount:0},
    {name:'Saucisse Braisé', prix: 80, photo:'../../assets/img/slider/grilled-meat-6530766_1280.jpg', description:'Saucisse braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal', discount:0}
      


  ];

  carousel :Produit[] =[
    {name:'Porc Braisé', prix: 120, photo:'../../assets/img/slider/porc3.jpg', description:'Porc braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Salade crevette', prix: 110, photo:'../../assets/img/slider/asian-1238723_1280.jpg', description:'Salade crevette, Excellent plat comme entrée du menu.', categorie:'Plat principal'},
    {name:'Riz', prix: 30, photo:'../../assets/img/slider/fried-rice1.jpg', description:'Riz basmati. Accompagnement de luxe pour vos plats.', categorie:'Accompagnement'},
    {name:'Porc Braisé', prix: 120, photo:'../../assets/img/slider/porc2.jpg', description:'Porc braisé sur feu doux à la sauce de persil et mouscade'},
    {name:'Poisson Braisé', prix: 90, photo:'../../assets/img/slider/fish1.jpg', description:'Poisson braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal'},
    {name:'Boeuf barbecue', prix: 110, photo:'../../assets/img/slider/barbecue-1239434_1280.jpg', description:'Boeuf barbecue sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal'},
    {name:'Viande Braisée', prix: 90, photo:'../../assets/img/slider/bbq-4373644_1280.jpg', description:'Viande braisée au charbon avec la sauce de persil et mouscade.', categorie:'Plat principal'},
    {name:'Saucisse Braisé', prix: 80, photo:'../../assets/img/slider/grilled-meat-6530766_1280.jpg', description:'Saucisse braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal'},
    {name:'Frites', prix: 20, photo:'../../assets/img/slider/bowl-1842294_1280.jpg', description:'Frites croustillantes, dorées à feu doux. Excellent accompagnement.'},
    
  ]*/
  panier : Produit[] = [{name:'Viande Braisée', prix: 90, photo:'../../assets/img/slider/bbq-4373644_1280.jpg', description:'Viande braisée au charbon avec la sauce de persil et mouscade.', categorie:'Plat principal'},
  {name:'Saucisse Braisé', prix: 80, photo:'../../assets/img/slider/grilled-meat-6530766_1280.jpg', description:'Saucisse braisé sur feu doux à la sauce de persil et mouscade.', categorie:'Plat principal'},
  {name:'Frites', prix: 20, photo:'../../assets/img/slider/bowl-1842294_1280.jpg', description:'Frites croustillantes, dorées à feu doux. Excellent accompagnement.'},
 ];

  categorie : any[] = ['Plat principal', 'Accompagnement','Boisson'];
  allergene : any[] = ['céreale', 'crustacé', 'oeuf', 'arachide', 'poisson','soja','Céleri','Sésame','Noix','Lait', 'lupin','Anhydride','Mollusque'];
  

  discount  : any[] = [0,5,10,15,20,25,30,35,40,45,50];


  constructor(private http: HttpClient) {

   }


   postProduit(produit: Produit){
    return this.http.post(this.API_postproduit, produit);
   }
   postUpload(formdata : FormData){
    return this.http.post(this.API_imageUpload, formdata);
   }
   postImport(path:string){
    return this.http.post(this.API_postimportproduit,path)
   }
   postUploadmulti(formdata : FormData){
    return this.http.post(this.API_multiImgUpload,formdata)
   }


   getProduit(){
    return this.http.get(this.API_getproduit);   
   }
   getOneProduit(produit: Produit){
    const id = produit._id;
    return this.http.get(this.API_getOneproduit+"/"+id)
   }

   editProduit(produit: Produit){
    return this.http.patch(this.API_editProduit,produit)
   }
   editPhoto(produit:Produit){
    return this.http.patch(this.API_editphotoProduit, produit);
   }
   editAllergene(produit: Produit){
    return this.http.patch(this.API_editallergeneProduit, produit);
   }
   supprimerProduit(idproduit :any){
    return this.http.delete(this.API_deleteProduit+"/"+idproduit);
   }
   supprimerimgProduit(idproduit :any){
    return this.http.delete(this.API_deleteimgProduit+"/"+idproduit);
   }



  AjoutPanier(produit:Produit){
    //sessionStorage.setItem('produit', produit.name);
    if(this.panier.indexOf(produit) != -1) return 
    else this.panier.push(produit);
    return this.panier;
  }

  
  onFileSelected(event :any, fileName: any) {

    const file:File = event.target.files[0];

    if (file) {

        fileName = file.name;
        const formData = new FormData();
        formData.append("produitImage", file);
        const upload$ = this.postUpload(formData);
       return upload$;
       
    }else{ return ;}
}

onFileSelectedmultiImg(event :any) {

  const files:File[] = event.target.files;

  if (!files) return ;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
       formData.append(`multifiles`, files[i])
    }
      const upload$ = this.postUploadmulti(formData);
     return upload$;
     
 
}



onReceive = (message : string ) => { return this.message.next(message);}



  /*
  UploadExcel(formData: FormData) {  
    let headers = new HttpHeaders();  
  
    headers.append('Content-Type', 'multipart/form-data');  
    headers.append('Accept', 'application/json');  
  
    const httpOptions = { headers: headers };  
  
    return this.http.post(this.API_postimportproduit, formData, httpOptions)  
  }  

*/

  BindUser(): Observable<Produits[]> {  
    return this.http.get<Produits[]>(this.API_getproduit);  
  }  




}




