import { $authHost } from "./index";

export const fetchInventory = async (userId) => {
    const { data } = await $authHost.get('api/inventory/' + userId)
    return data
}

export const fetchBookById = async (userId, bookId) => {
    const { data } = await $authHost.get(`api/inventory/${userId}/${bookId}`)
    return data
}

export const addBook = async (userId, bookId) => {
    const { data } = await $authHost.post(`api/inventory/${userId}/${bookId}`)
    return data
}

export const removeBook = async (userId, bookId) => {
    const { data } = await $authHost.put(`api/inventory/${userId}/${bookId}`)
    return data
}
