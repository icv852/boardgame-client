import axios from "axios";

export enum HttpMethod {
    GET = "get",
    POST = "post",
    PATCH = "patch",
    PUT = "put",
    DELETE = "delete"
}

export async function sendRequest(method: HttpMethod, url: string, data?: any) {
    try {
        if (method === HttpMethod.GET) {
            const response = await axios({
                method,
                url,
                params: data
            })
            return response.data
        } else {
            const response = await axios({
                method,
                url,
                data
            })
            return response.data
        }
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            throw new Error(e.response?.data?.error?.message || e.message)
        }
        throw new Error(`An unexpected error occurred. Please try again later.`)
    }
}