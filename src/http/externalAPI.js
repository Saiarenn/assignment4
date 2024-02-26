import { $host } from "./index";

export const getCurrency = async () => {
    const { data } = await $host.get('currency')
    return data
}

export const getPhoto = async (title) => {
    const { data } = await $host.post('photo', title)
    return data
}