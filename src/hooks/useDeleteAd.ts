import { useMutation } from "react-query";
import { AdService } from "../services";

interface ApiError {
    message: string;
}  

const useDeleteAd = () => {
    return useMutation<void, ApiError, string>(
        (id: string) => AdService.deleteAd(id)
    );
};

export default useDeleteAd;
