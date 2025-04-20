import * as SecureStore from "expo-secure-store"

export async function saveToken(token: string) {
    try {
        await SecureStore.setItemAsync("jwt_token", token)
    } catch (e) {
        console.error(`Error storing JWT token. ${e}`)
        throw Error(`An unexpected error occurred. Please try again later.`)
    }
}

export async function getToken() {
    try {
        return await SecureStore.getItemAsync("jwt_token")
    } catch (e) {
        console.error(`Error getting JWT token. ${e}`)
        throw Error(`An unexpected error occurred. Please try again later.`)
    }
}

export async function deleteToken() {
    try {
        return await SecureStore.deleteItemAsync("jwt_token")
    } catch (e) {
        console.error(`Error deleting JWT token. ${e}`)
        throw Error(`An unexpected error occurred. Please try again later.`)
    }
}