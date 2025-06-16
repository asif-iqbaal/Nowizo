import { CreateUser } from "@/context";
import {axiosClient} from "@/lib/utils"

export const SignUpUser = async function({
    username,
    email,
    password
}:CreateUser){
    try {
        const response = await axiosClient.post('/api/users/signup',{
            username,
            email,
            password
        });
        return response.data;

    } catch (error:any) {
        throw  error;
    }
}