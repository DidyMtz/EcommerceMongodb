export class Produits{
    _id!: number;
    name:string = "";
    prix:number = 0;
    photo:string ="";
    description!:string;
    allergene!:any[];
    favori!:string;
    categorie!:string;
    discount:number = 0;
}