import { useMutation } from "react-query";
import { CategoryService } from "../services";

interface ApiError {
    message: string;
}

const useDeleteSubcategory = () => {
    return useMutation<void, ApiError, { categoryId: string; subcategoryId: string }>(
        ({ categoryId, subcategoryId }) => CategoryService.deleteSubcategory(categoryId, subcategoryId)
    );
};

export default useDeleteSubcategory;
