export class Produit{
    name :string = "";
    prix:number = 0;
    photo:string ="";
    description?:string;
    allergene?:string;
    favori?:boolean;
    nbr?: number;
    categorie?:string;
    promo?: [{code : '', datefin:'', discount: 5 | 0}];
    discount?:number = 0;
}