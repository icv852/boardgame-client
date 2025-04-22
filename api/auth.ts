import { HttpMethod, sendRequest } from "@/utils/http"

const LOCAL_API_BASE_URL = "http://localhost:4000"

export const checkUsername = async (data: { username: string }): Promise<void> => await sendRequest(HttpMethod.POST, `${LOCAL_API_BASE_URL}/auth/v1/check-username`, data)

export const register = async (data: { username: string, password: string }) => await sendRequest(HttpMethod.POST, `${LOCAL_API_BASE_URL}/auth/v1/register`, data)

export const login = async (data: { username: string, password: string }) => await sendRequest(HttpMethod.POST, `${LOCAL_API_BASE_URL}/auth/v1/login`, data)