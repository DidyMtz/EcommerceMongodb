export class Produit{
    name :string = "";
    prix:number = 0;
    photo:string ="";
    description?:string;
    allergene?:any[];
    favori?:boolean;
    nbr?: number;
    categorie?:string;
    discount?:number = 0;
}