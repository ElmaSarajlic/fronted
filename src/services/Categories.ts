import { Category, Subcategory } from "../utils/types";
import appAxios from "./AppAxios";


const getAllCategories = async (): Promise<Category[]> => {
    return appAxios.get(`/categories`).then(
        (response) => {
            const data = response.data;
            console.log(data); 

            return data;
        });
}

const createCategory = async (category: Category): Promise<Category[]> => {
    return appAxios.post('/categories', category).then(
        (response) => { 
            const data = response.data;
            console.log(response);
            console.log(data);
 
            return data;
        });
 }


 const createSubcategory = async (categoryId: string, subcategory: Subcategory): Promise<Category> => {
    return appAxios.post(`/categories/${categoryId}/subcategories`, subcategory).then((response) => {
      const data = response.data;
      return data;
    });
  };



  const deleteSubcategory = async (categoryId: string, subcategoryId: string): Promise<void> => {
    console.log(`Deleting subcategory with ID: ${subcategoryId}`);
    
    return appAxios.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`).then(() => {
      console.log('subcategory deleted successfully');
    }).catch((error) => {
      console.error('Error deleting subcategory:', error);
      throw error; 
    });

};
  

export default {getAllCategories, createCategory, createSubcategory, deleteSubcategory}