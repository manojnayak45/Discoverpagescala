// src/pages/TopPage.js
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArticleCard from '../components/ArticleCard';
import SkeletonLoader from '../components/SkeletonLoader';

const TopPage = () => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Mock API fetch
  const fetchArticles = (pageNumber = 1) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newArticles = Array.from({ length: 5 }, (_, index) => ({
          title: `Top News Article ${index + 1 + (pageNumber - 1) * 5}`,
          imageUrl: `https://via.placeholder.com/600x300`,
          description: `This is a description of top news article ${index + 1 + (pageNumber - 1) * 5}.`
        }));
        resolve(newArticles);
      }, 1000); // Simulate network delay
    });
  };

  useEffect(() => {
    loadMoreArticles();
  }, []);

  const loadMoreArticles = async () => {
    const newArticles = await fetchArticles(page);
    setArticles((prev) => [...prev, ...newArticles]);
    setLoading(false);
    setPage((prev) => prev + 1);
    if (newArticles.length === 0) {
      setHasMore(false);
    }
  };

  return (
    <div>
      {loading && (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      )}

      <InfiniteScroll
        dataLength={articles.length}
        next={loadMoreArticles}
        hasMore={hasMore}
        loader={<SkeletonLoader />}
        endMessage={<p style={{ textAlign: 'center' }}>No more articles to show</p>}
      >
        <div className="articles-grid">
          {articles.map((article, index) => (
            <div
              className={
                index === 0 || index === articles.length - 1
                  ? 'horizontal-card'
                  : 'vertical-cards'
              }
              key={index}
            >
              <ArticleCard
                title={article.title}
                imageUrl={article.imageUrl}
                description={article.description}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default TopPage;
