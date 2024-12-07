import axios from "axios"

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
// const API_KEY =`aPLdDfQrL3IoKUlwq1u5FJEmGwCBHOKKJpQ0Dst9wXbLdW6t`
const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL
// const BASE_URL =`https://api.currentsapi.services/v1/`


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