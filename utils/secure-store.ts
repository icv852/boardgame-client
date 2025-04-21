import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

const isWeb = Platform.OS === "web" // for dev

export async function saveToken(token: string) {
    try {
        isWeb ? window.sessionStorage.setItem("jwt_token", token) : await SecureStore.setItemAsync("jwt_token", token)
    } catch (e) {
        console.error(`Error storing JWT token. ${e}`)
        throw Error(`An unexpected error occurred. Please try again later.`)
    }
}

export async function getToken() {
    try {
        return isWeb ? window.sessionStorage.getItem("jwt_token") : await SecureStore.getItemAsync("jwt_token")
    } catch (e) {
        console.error(`Error getting JWT token. ${e}`)
        throw Error(`An unexpected error occurred. Please try again later.`)
    }
}

export async function deleteToken() {
    try {
        return isWeb ? window.sessionStorage.removeItem("jwt_token") : await SecureStore.deleteItemAsync("jwt_token")
    } catch (e) {
        console.error(`Error deleting JWT token. ${e}`)
        throw Error(`An unexpected error occurred. Please try again later.`)
    }
}