import { useMutation, useQueryClient } from "react-query";
import { User } from "../utils/types";
import { UserService } from "../services";

interface ApiError {
    message: string;
}  

const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation<User, ApiError, { id: string, user: User }>(
        ({ id, user }) => UserService.updateUser(id, user),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('user');
            },
        }
    );
};

export default useUpdateUser;