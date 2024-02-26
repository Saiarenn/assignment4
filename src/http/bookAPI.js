import { $authHost } from "./index";

export const createBook = async (book) => {
    const { data } = await $authHost.post('api/book/', book)
    return data
}

export const fetchBooks = async () => {
    const { data } = await $authHost.get('api/book/')
    return data
}

export const fetchBookById = async (bookId) => {
    const { data } = await $authHost.get(`api/book/${bookId}`)
    return data
}

export const deleteBookById = async (bookId) => {
    const { data } = await $authHost.delete(`api/book/${bookId}`)
    return data
}

export const updateBookById = async (bookId, book) => {
    const { data } = await $authHost.put(`api/book/${bookId}`, book)
    return data
}