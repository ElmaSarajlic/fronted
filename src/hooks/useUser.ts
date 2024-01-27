import { useQuery } from "react-query";
import { UserService } from "../services";
import { User } from "../utils/types";

interface ApiError {
    message: string;
}  

const useUser = (id: string) => {
    return useQuery<User, ApiError>(['user', id],
        () => UserService.getUserById(id)
    );
}

export default useUser;