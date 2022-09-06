export class Produit{
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