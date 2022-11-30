export class Produit{
    _id?: number
    name :string = "";
    prix:number = 0;
    photo:string ="";
    description?:string;
    allergene?:any[];
    favori?:string;
    nbr?: number;
    categorie?:string;
    discount?:number = 0;
}