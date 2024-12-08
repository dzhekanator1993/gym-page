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
    const [error, setError] = useState(null); // Стан для помилок
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
        
        fetch('/api/news')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP помилка: ${response.status}`);
            }
            return response.json(); // Перетворення відповіді на JSON
        })
        .then(data => {
            console.log('Отримані дані:', data); //Перевіряємо структуру відповіді
            setNews(data || []); // Забезпечуємо, що новини завжди будуть масивом
            setNews(data.news); // Встановлюємо дані в стан
            setIsLoading(false); // Завершили завантаження
            setError(null); // Очищаємо помилки
        })
        .catch(error => {
            console.error('Помилка при завантаженні новин:', error);
            setError('Не вдалося завантажити новини.'); // Встановлюємо повідомлення про помилку
            setNews([]); // Запобігаємо undefined
            setIsLoading(false); // Завершили завантаження
            
        });

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

    if (isLoading) {
        return <p>Завантаження новин...</p>;
    }
    if (!news.length) {
        return <p>Новини відсутні.</p>;
    }
    if (error) {
        return <p>{error}</p>; // Показуємо повідомлення про помилку
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