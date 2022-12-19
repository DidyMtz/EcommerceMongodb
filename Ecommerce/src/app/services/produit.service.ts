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
  message: BehaviorSubject<string> = new BehaviorSubject<string>("");
  API_postproduit = environment.API_url + "/posts/";
  API_postimportproduit = environment.API_url + "/posts/import";
  API_imageUpload = environment.API_url + "/posts/upload";
  API_multiImgUpload = environment.API_url + "/posts/uploadmultipleimg";
  API_getproduit = environment.API_url + "/posts/";
  API_getOneproduit = environment.API_url + "/posts/:produitID";
  API_editProduit = environment.API_url + "/posts/update";
  API_editphotoProduit = environment.API_url + "/posts/updatephoto";
  API_editallergeneProduit = environment.API_url + "/posts/updateallergene";
  API_deleteProduit = environment.API_url + "/posts/delete";
  API_deleteimgProduit = environment.API_url + "/posts/deleteimg";


  listProduit: any[] = [];

  promo: any[] = [
    { code: 'AAVV', datefin: '29/8/2022', discount: .1 },
    { code: 'BBHH', datefin: '28/8/2022', discount: .2 },
    { code: 'XXYY', datefin: '29/8/2022', discount: .3 }
  ];
  produits: any[] = [];
  panier: Produit[] = [];
  
  /*
  panier: Produit[] = [{ name: 'Viande Braisée', prix: 90, photo: '../../assets/img/slider/bbq-4373644_1280.jpg', description: 'Viande braisée au charbon avec la sauce de persil et mouscade.', categorie: 'Plat principal' },
  { name: 'Saucisse Braisé', prix: 80, photo: '../../assets/img/slider/grilled-meat-6530766_1280.jpg', description: 'Saucisse braisé sur feu doux à la sauce de persil et mouscade.', categorie: 'Plat principal' },
  { name: 'Frites', prix: 20, photo: '../../assets/img/slider/bowl-1842294_1280.jpg', description: 'Frites croustillantes, dorées à feu doux. Excellent accompagnement.' },
  ];
*/
  allergene: any[] = ['céreale', 'crustacé', 'oeuf', 'arachide', 'poisson', 'soja', 'Céleri', 'Sésame', 'Noix', 'Lait', 'lupin', 'Anhydride', 'Mollusque'];


  discount: any[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];


  constructor(private http: HttpClient) {

  }


  /*
  post product
  */
  postProduit(produit: Produit) {
    return this.http.post(this.API_postproduit, produit);
  }
  /*
  upload image with onselectedFile function
  */
  postUpload(formdata: FormData) {
    return this.http.post(this.API_imageUpload, formdata);
  }
  /*
  import
  */
  postImport(path: string) {
    return this.http.post(this.API_postimportproduit, path)
  }
  /*
  upload multiple image with onFileSelectedmultiImg... function 
  */
  postUploadmulti(formdata: FormData) {
    return this.http.post(this.API_multiImgUpload, formdata)
  }

  /*
  get products from database
  */
  getProduit() {
    return this.http.get(this.API_getproduit);
  }


  getOneProduit(produit: Produit) {
    const id = produit._id;
    return this.http.get(this.API_getOneproduit + "/" + id)
  }
/*
edit produit
*/
  editProduit(produit: Produit) {
    return this.http.patch(this.API_editProduit, produit)
  }
  /*
  edit image
  */
  editPhoto(produit: Produit) {
    return this.http.patch(this.API_editphotoProduit, produit);
  }
  editAllergene(produit: Produit) {
    return this.http.patch(this.API_editallergeneProduit, produit);
  }
  supprimerProduit(idproduit: any) {
    return this.http.delete(this.API_deleteProduit + "/" + idproduit);
  }
  supprimerimgProduit(idproduit: any) {
    return this.http.delete(this.API_deleteimgProduit + "/" + idproduit);
  }



  AjoutPanier(produit: Produit) {
    //sessionStorage.setItem('produit', produit.name);
    if (this.panier.indexOf(produit) != -1) return
    else this.panier.push(produit);
    return this.panier;
  }


  /*
  upload single image

  */
  onFileSelected(event: any, fileName: any) {

    const file: File = event.target.files[0];

    if (file) {

      fileName = file.name;
      const formData = new FormData();
      formData.append("produitImage", file);
      const upload$ = this.postUpload(formData);
      return upload$;

    } else { return; }
  }

  /*
  upload multiple image
  */
  onFileSelectedmultiImg(event: any) {

    const files: File[] = event.target.files;

    if (!files) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`multifiles`, files[i])
    }
    const upload$ = this.postUploadmulti(formData);
    return upload$;


  }


  /*
  recupere le message behavior subject
  */
  onReceive = (message: string) => { return this.message.next(message); }

  /*
  get products
  */
  BindUser(): Observable<Produits[]> {
    return this.http.get<Produits[]>(this.API_getproduit);
  }




}




