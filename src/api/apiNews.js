import axios from "axios";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY

const BASE_URL = process.env.REACT_APP_NEWS_BASE_API_URL

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