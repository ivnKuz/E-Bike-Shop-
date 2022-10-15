export interface productCard{
//creating interface for a card component
     name?:string;
     id?: string;
     imgFile?:File;
     imgUrl:string;
     discount:number;  
     price:number;
     description:string;
     shop: string;
     shipping:string;
     new:boolean;
     main:boolean;
     discountUntil?: string;
     color: string[];
     size: string[];

}
