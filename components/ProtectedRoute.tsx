import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { token, isLoadingToken } = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!isLoadingToken && !token) {
            router.replace("/")
        }
    }, [token, isLoadingToken])

    if (isLoadingToken || !token) {
        return(
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return <>{children}</>
}