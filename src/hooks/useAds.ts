import { useQuery } from "react-query";
import { AdService } from "../services";
import { Ad } from "../utils/types";

// because ts couldn't infer the type of the error
interface ApiError {
    message: string;
}  

// get exercise details by id
const useAds = () => {
    return useQuery<Ad[], ApiError>('ad',
        () => AdService.getallAds(),
    );
}


export default useAds