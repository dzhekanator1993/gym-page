import React from 'react';

const NewsItem = ({ news, toggleExpandNews, expandedNewsId, user, openModal }) => {
  return (
    <div className="news-item" onClick={() => toggleExpandNews(news.id)}>
      <div className="news-item-header">
        <h3>{news.title}</h3>
        {user && (
          <button onClick={(e) => {e.stopPropagation(); openModal("confirmDelete", news.id);}}>
            Видалити
          </button>
        )}
      </div>
      {expandedNewsId === news.id && (
        <div className="news-item-details">
          <p>{news.content}</p>
          <div>Автор: {news.author}</div>
          <div>Час: {news.createdAt}</div>
        </div>
      )}
    </div>
  );
};

export default NewsItem;
