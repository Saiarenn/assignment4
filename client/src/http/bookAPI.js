import { $authHost } from "./index";

export const createBook = async (userId, book) => {
    const { data } = await $authHost.post('api/book/' + userId, book)
    return data
}

export const fetchBooks = async (userId) => {
    const { data } = await $authHost.get('api/book/' + userId)
    return data
}

export const fetchBookById = async (userId, bookId) => {
    const { data } = await $authHost.get(`api/book/${userId}/${bookId}`)
    return data
}

export const deleteBookById = async (userId, bookId) => {
    const { data } = await $authHost.delete(`api/book/${userId}/${bookId}`)
    return data
}

export const updateBookById = async (userId, bookId, book) => {
    const { data } = await $authHost.put(`api/book/${userId}/${bookId}`, book)
    return data
}