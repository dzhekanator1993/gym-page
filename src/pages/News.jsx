import { useEffect, useState } from "react";
import Dates from "../components/date/Dates";
import Banner from "../components/banner/Banner";
import NewsList from "../components/newsList/NewsList";
import { getNews } from "../api/apiNews"
import styles from '../styles/news.styles.module.css'

const News = () => {
    const [news, setNews] = useState([])
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getNews();
                setNews(response.news)
            } catch (error) {
                console.log(error);
            }
        }
        fetchNews();


    }, [])
    return (
        <>
            <div className={styles.container}>
                <Dates />
                <main className={styles.main}>

                    {news.length > 0 ? <Banner item={news[0]} /> : null}
                    <NewsList news={news}/>
                    
                </main>
            </div>
        </>
    )


}
export default News;