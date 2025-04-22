import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native"; 
import { Input, View, Text } from "@ant-design/react-native"
import { colors } from '@/constants/colors';
import CenteredView from "@/components/CenteredView";
import ArrowBtn from "@/components/ArrowBtn"
import { Link, useRouter } from "expo-router";
import { login } from "@/api/auth";
import { AuthContext } from "@/components/AuthContext";
import { saveToken } from "@/utils/secure-store";

export default function Index() {
  const router = useRouter()
  const { setToken, token } = useContext(AuthContext)

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
      try {
        const { token } = await login({ username, password })
        setToken(token)
        await saveToken(token)
        router.replace("/dashboard")
      } catch (e: unknown) {
          if (e instanceof Error) {
              console.error(e)
              setError(e.message)
          } else {
              setError(`An unexpected error occurred. Please try again later.`)
          }
      }
  }

  useEffect(() => {
    if (!token) return
    router.replace("/dashboard")
  }, [token])
  
  return (
    <CenteredView>
      <View style={{ width: "80%" }}>
        <Text style={styles.title}>Login</Text>
        <Input
            style={styles.inputBox}
            value={username}
            placeholder="Username"
            onChangeText={setUsername}
        />
        <Input
            style={styles.inputBox}
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
            type="password"
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <View />
            <ArrowBtn direction="right" onPress={handleLogin} />
        </View>
      </View>    

      <View style ={{ marginTop: 50 }}>
        <Link href="/registration" style={{ color: colors.blue }}>Click here to sign up</Link>
      </View>
    </CenteredView>
  );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 20
    },
    inputBox: {
        width: "100%", 
        borderWidth: 2,
        height: 50,
        borderRadius: 8,
        marginBottom: 20,
    },
    error: {
        color: colors.red,
        marginBottom: 20,
    }
})