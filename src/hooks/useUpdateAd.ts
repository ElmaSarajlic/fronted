/*import { useMutation, useQueryClient } from 'react-query';
import { Ad } from '../utils/types';
import { AdService } from '../services';

interface ApiError {
  message: string;
}  

const useUpdateAd = () => {
  const queryClient = useQueryClient();
  return useMutation<Ad, ApiError, { id: string, ad: Ad }>(
      ({ id, ad }) => AdService.updateAd(id, ad),
      {
          onSuccess: () => {
              queryClient.invalidateQueries('user');
          },
      }
  );
};


export default useUpdateAd;*/
