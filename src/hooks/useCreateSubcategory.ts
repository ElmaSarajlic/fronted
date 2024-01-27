import { useMutation, useQueryClient } from "react-query";
import { Subcategory } from "../utils/types";
import { CategoryService } from "../services";


const useCreateSubcategory = () => {
    const queryClient = useQueryClient();
    return useMutation((data:  { categoryId: string; subcategory: Subcategory }) =>
     CategoryService.createSubcategory(data.categoryId, data.subcategory), {
        onSuccess: () => {
            queryClient.invalidateQueries('categories/{categoryId}/subcategories');
        },
    });
 };

export default useCreateSubcategory;

