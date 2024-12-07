import NewsItem from '../newsItem/NewsItem';
import styles from './style.css'

const NewsList = ({ news }) => {
    return (
        <ul className={styles.list}>
            {news.map((item) => {
                return <NewsItem key={item.id} item={item}/>
           })}
        </ul>
    );
};
export default NewsList;

