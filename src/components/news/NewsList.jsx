import React from 'react';
import NewsItem from './NewsItem';

const NewsList = ({ newsList, toggleExpandNews, expandedNewsId, user, openModal }) => {
  return (
    <div className="news-list">
      {newsList.length === 0 ? (
        <p>Новин поки немає...</p>
      ) : (
        newsList.map(news => (
          <NewsItem
            key={news.id}
            news={news}
            toggleExpandNews={toggleExpandNews}
            expandedNewsId={expandedNewsId}
            user={user}
            openModal={openModal}
          />
        ))
      )}
    </div>
  );
};

export default NewsList;
