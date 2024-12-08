import axios from "axios";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const BASE_URL = process.env.REACT_APP_NEWS_BASE_API_URL

export const getNews = async (page_number = 1, page_size = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}search`, {
            params: {
                apiKey: API_KEY,
                page_number,
                page_size,
            }
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}