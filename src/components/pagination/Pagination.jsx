import styles from './style.module.css'

const Pagination = ({ totalPages, handlePreviousPage, handlePageClick, handleNextPage, currentPage }) => {
    return (
        <div className={styles.pagination}>
            <div className={styles.list}>
                <button disabled={currentPage <= 1} onClick={handlePreviousPage} className={styles.pageNumber}>{'<'}</button>
                {[...Array(totalPages)].map((_, index) => {
                    return <button onClick={() => handlePageClick(index + 1)} className={styles.pageNumber} disabled={index + 1 === currentPage} key={index}>{index + 1}</button>
                })}
                <button disabled={currentPage >= totalPages} onClick={handleNextPage} className={styles.pageNumber}>{'>'}</button>
            </div>
        </div>
    )

}
export default Pagination;

