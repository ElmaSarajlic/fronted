import { Ad } from "../utils/types";
import appAxios from "./AppAxios";


const getallAds = async (): Promise<Ad[]> => {
    return appAxios.get(`/ads/`).then(
        (response) => {
            const data = response.data;
            console.log(data);

            return data;
        });
}

const CreateAd = async (ad: Ad): Promise<Ad[]> => {
    return appAxios.post('/ads/', ad).then(
        (response) => {
            const data = response.data;
            console.log(response);
            console.log(data);
 
            return data;
        });
 }

 const getAdsBySubcategory = async (subcategoryName: string): Promise<Ad[]> => {
    return appAxios.get(`/ads/subcategory/${subcategoryName}`).then(
        (response) => response.data
    );
};

const deleteAd = async (id: string): Promise<void> => {
    console.log(`Deleting ad with ID: ${id}`);
    
    return appAxios.delete(`/ads/${id}`).then(() => {
      console.log('Ad deleted successfully');
    }).catch((error) => {
      console.error('Error deleting ad:', error);
      throw error; // Re-throw the error for further handling if needed
    });

};



/*const updateAd = async (id: string, ad: Ad): Promise<Ad> => {
     return appAxios.put(`/ads/${id}`, ad)
       .then((response) => response.data)
       .catch((error) => {
          console.error('Error updating ad:', error);
            throw error;
          }); 
      }
  */



export default {getallAds, CreateAd, getAdsBySubcategory, deleteAd}