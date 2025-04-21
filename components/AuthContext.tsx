import { createContext, ReactNode, useEffect, useState } from "react";
import { getToken } from "@/utils/secure-store";

type AuthContextType = {
    token: string | null
    setToken: (token: string | null) => void
    isLoadingToken: boolean
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => {},
    isLoadingToken: true
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [isLoadingToken, setisLoadingToken] = useState(true)

    const loadToken = async () => {
        try {
            const storedToken = await getToken()
            setToken(storedToken)
        } catch (e) {
            console.error(`Error loading JWT token: ${e}`)
        } finally {
            setisLoadingToken(false)
        }
    }

    useEffect(() => {
        loadToken()
    }, [])

    return (
        <AuthContext.Provider value={{ token, setToken, isLoadingToken }}>
            {children}
        </AuthContext.Provider>
    )
}