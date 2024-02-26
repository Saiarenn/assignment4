import { $authHost } from "./index";

export const createQuiz = async (question) => {
    const { data } = await $authHost.post('api/quiz', question)
    return data
}

export const fetchQuiz = async () => {
    const { data } = await $authHost.get('api/quiz')
    return data
}