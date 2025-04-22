import { AuthContext } from "@/components/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { View, Text, Button } from "@ant-design/react-native";
import { useContext } from "react";

export default function Dashboard() {
    const { setToken } = useContext(AuthContext)

    async function handleLogout() {
        setToken(null)
    }

    return (
        <ProtectedRoute>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 20 }}>This is protected dashboard.</Text>
                <Button onPress={handleLogout}>Logout</Button>
            </View>
        </ProtectedRoute>
    )
}