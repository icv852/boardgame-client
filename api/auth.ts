import { HttpMethod, sendRequest } from "@/utils/http"
import axios from "axios"

export const checkUsername = async (data: { username: string }): Promise<void> => await sendRequest(HttpMethod.POST, `http://localhost:4000/auth/v1/check-username`, data)

export const register = async (data: { username: string, password: string }) => {
    try {
        const res = await axios.post(`http://localhost:4000/auth/v1/register`, data)
        return res.data
    } catch (e) {
        console.log(e)
        throw e
    }    
}