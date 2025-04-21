import ProtectedRoute from "@/components/ProtectedRoute";
import { View, Text } from "@ant-design/react-native";

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 20 }}>This is protected dashboard.</Text>
            </View>
        </ProtectedRoute>
    )
}