import { SetStateAction } from "react";

export type Ad =  {
    id?: string;
    title: string;
    subcategory: string;
    category: string;
    description: string;
    contact:string;
    imgUrl:string;
    creationDate?: Date;

}

export type User ={
    id: string;
    username?: string;
    userType?: string;
    email?: string;
    password?: string;
    imgUrl? : string;
    
}
export type Subcategory = {
    subcategories?: SetStateAction<Subcategory[]>;
    id: string;
    name: string;
  };
  
  export type Category = {
    id?: string
    name: string;
    subcategories: Subcategory[];
  };
  
  export type Password = {
    userId: any;
    oldPassword: string,
    newPassword: string
}