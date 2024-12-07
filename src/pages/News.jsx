import { useEffect, useState } from "react";
import Dates from "../components/date/Dates";
import Banner from "../components/banner/Banner";
import NewsList from "../components/newsList/NewsList";
import { getNews } from "../api/apiNews"
import styles from '../styles/news.styles.module.css'
import Skeleton from "../components/skeleton/Skeleton";

const News = () => {
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true)
                const response = await getNews();
                setNews(response.news)
                setIsLoading(false)
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

                    {news.length > 0 && !isLoading ? <Banner item={news[0]} /> : <Skeleton type={'banner'} count={1} />}
                    {!isLoading ? (
                        <NewsList news={news}/>
                    ) : (
                        <Skeleton type={'item'} count={10} />
                    )}
                    
                </main>
            </div>
        </>
    )


}
export default News;