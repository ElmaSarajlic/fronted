import { useQuery } from 'react-query';
import { Ad } from '../utils/types';
import { AdService } from '../services';

interface ApiError {
    message: string;
}

const useGetAdsBySubcategory = (subcategoryName: string) => {
    return useQuery<Ad[], ApiError>(
        ['adsBySubcategory', subcategoryName], 
        () => AdService.getAdsBySubcategory(subcategoryName),
    );
};
export default useGetAdsBySubcategory;
