import { useEffect, useState } from "react";
import Dates from "../components/date/Dates";
import Banner from "../components/banner/Banner";
import NewsList from "../components/newsList/NewsList";
import { getNews } from "../api/apiNews"
import styles from '../styles/news.styles.module.css'
import Skeleton from "../components/skeleton/Skeleton";
import Pagination from "../components/pagination/Pagination";

const News = () => {
    const [news, setNews] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 10
    const pageSize = 10

    const fetchNews = async (currentPage) => {
        try {
            setIsLoading(true)
            const response = await getNews(currentPage, pageSize);
            setNews(response.news)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchNews(currentPage);
    }, [currentPage])

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <div className={styles.container}>
                <Dates />
                <main className={styles.main}>

                    {news.length > 0 && !isLoading ? <Banner item={news[0]} /> : <Skeleton type={'banner'} count={1} />}
                    <Pagination
                        handlePreviousPage={handlePreviousPage}
                        handlePageClick={handlePageClick}
                        handleNextPage={handleNextPage}
                        currentPage={currentPage}
                        totalPages={totalPages} />
                    {!isLoading ? (
                        <NewsList news={news} />
                    ) : (
                        <Skeleton type={'item'} count={10} />
                    )}
                    <Pagination
                        handlePreviousPage={handlePreviousPage}
                        handlePageClick={handlePageClick}
                        handleNextPage={handleNextPage}
                        currentPage={currentPage}
                        totalPages={totalPages} />
                </main>
            </div>
        </>
    )


}
export default News;