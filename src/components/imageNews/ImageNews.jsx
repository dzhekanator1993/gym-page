import styles from './style.module.css'

const ImageNews = ({ image }) => {
    return (
        <div className={styles.wrapper}>
           {image ? <img className={styles.news_img} src={image} alt="news_img" /> : null} 
        </div>
    )

}
export default ImageNews;

