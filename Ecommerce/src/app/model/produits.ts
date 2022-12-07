export class Produits{
  constructor( 
    public _id: number,
    public name:string ,
    public  prix:number,
    public photo:string,
    public description:string,
    public allergene:any[],
    public favori:string,
    public categorie:string,
    public  discount:number
  ){}
}