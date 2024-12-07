import axios from "axios"

console.log('import.meta.env:', import.meta.env);

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL

export const getNews = async () => {
    try {
        const response = await axios.get(`${BASE_URL}latest-news`, {
            params: {
                apiKey: API_KEY
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}