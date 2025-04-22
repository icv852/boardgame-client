import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native"; 
import { Input, View, Text } from "@ant-design/react-native"
import { colors } from '@/constants/colors';
import CenteredView from "@/components/CenteredView";
import ArrowBtn from "@/components/ArrowBtn"
import { checkUsername, register } from "@/api/auth";
import { usePathname, useRouter, Link } from "expo-router";
import { saveToken } from "@/utils/secure-store";
import { AuthContext } from "@/components/AuthContext";

enum Stage {
    ONE = 1,
    TWO = 2,
    DONE = 3,
}

export default function RegistrationPage() {
    const pathname = usePathname()
    const router = useRouter()
    const { setToken, token } = useContext(AuthContext)

    const [stage, setStage] = useState<Stage>(Stage.ONE)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    async function handleStageOne() {
        try {
            await checkUsername({ username })
            setStage(Stage.TWO)            
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message)
            } else {
                setError(`An unexpected error occurred. Please try again later.`)
            }
        }
    }

    async function handleStageTwo() {
        try {
            const { token } = await register({ username, password })
            setToken(token)
            await saveToken(token)
            router.replace("/dashboard")
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message)
            } else {
                setError(`An unexpected error occurred. Please try again later.`)
            }
        }
    }

    useEffect(() => {
        setError(null)
    }, [stage, pathname])

    useEffect(() => {
        if (!token) return
        router.replace("/dashboard")
    }, [token])

    return (
        <CenteredView>
            {stage === Stage.ONE && (
                <View style={{ width: "80%" }}>
                    <Text style={styles.title}>Choose a username</Text>
                    <Input
                        style={styles.inputBox}
                        value={username}
                        placeholder="Username"
                        onChangeText={setUsername}
                    />
                    {error && <Text style={styles.error}>{error}</Text>}
                    <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <View />
                        <ArrowBtn direction="right" onPress={handleStageOne} />
                    </View>
                </View>    
            )}
            {stage === Stage.TWO && (
                <View style={{ width: "80%" }}>
                    <Text style={styles.title}>Choose a password</Text>
                    <Text style={styles.subtitle}>Make sure it's at least 6 characters long.</Text>
                    <Input
                        style={styles.inputBox}
                        value={password}
                        placeholder="Password"
                        onChangeText={setPassword}
                        type="password"
                    />
                    {error && <Text style={styles.error}>{error}</Text>}
                    <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <ArrowBtn direction="left" onPress={() => setStage(Stage.ONE)} />
                        <ArrowBtn direction="right" onPress={handleStageTwo} />
                    </View>
                </View>    
            )}
            <View style ={{ marginTop: 50, alignItems: "center" }}>
                <Link href="/" style={{ color: colors.blue }}>Already have an account? Sign up</Link>
            </View>
        </CenteredView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 20
    },
    subtitle: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        color: colors.darkGrey
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