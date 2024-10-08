// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import ArticleCard from './components/ArticleCard';
import SkeletonLoader from './components/SkeletonLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMicrochip, faDollarSign, faPalette, faMedal, faFilm, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const Articles = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Simulate fetching articles based on category
  const fetchArticles = (pageNumber = 1) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newArticles = Array.from({ length: 6 }, (_, index) => ({
          title: `${category} Article ${index + 1 + (pageNumber - 1) * 6}`,
          imageUrl: `https://picsum.photos/1000/300?random=${Math.floor(Math.random() * 1000)}`,
          description: `This is a description of ${category} article ${index + 1 + (pageNumber - 1) * 6}.`,
        }));
        resolve(newArticles);
      }, 1000); // Simulate network delay
    });
  };

  useEffect(() => {
    loadMoreArticles();
  }, [category]);

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
    <div className="App">
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
          {articles.map((article, index) => {
            const isHorizontal = index % 5 === 0 || (index + 1) % 5 === 0;
            return (
              <div
                className={isHorizontal ? 'horizontal-card' : 'vertical-card'}
                key={index}
              >
                <ArticleCard
                  title={article.title}
                  imageUrl={article.imageUrl}
                  description={article.description}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

const Home = () => <Articles category="Top" />;
const TechScience = () => <Articles category="Tech & Science" />;
const Finance = () => <Articles category="Finance" />;
const ArtCulture = () => <Articles category="Art & Culture" />;
const Sports = () => <Articles category="Sports" />;
const Entertainment = () => <Articles category="Entertainment" />;

const App = () => {
  return (
    <Router>
      <header className="discover-header">
        <FontAwesomeIcon icon={faGlobe} size="2x" />
        <h2>Discover</h2>
      </header>
      
      <nav className="navbar">
        <div className="nav-container">
          <ul className="nav-links">
            <li>
              <NavLink exact="true" to="/" activeClassName="active">
                <FontAwesomeIcon icon={faStar} />
                Top
              </NavLink>
            </li>
            <li>
              <NavLink to="/tech-science" activeClassName="active">
                <FontAwesomeIcon icon={faMicrochip} />
                Tech & Science
              </NavLink>
            </li>
            <li>
              <NavLink to="/finance" activeClassName="active">
                <FontAwesomeIcon icon={faDollarSign} />
                Finance
              </NavLink>
            </li>
            <li>
              <NavLink to="/art-culture" activeClassName="active">
                <FontAwesomeIcon icon={faPalette} />
                Art & Culture
              </NavLink>
            </li>
            <li>
              <NavLink to="/sports" activeClassName="active">
                <FontAwesomeIcon icon={faMedal} />
                Sports
              </NavLink>
            </li>
            <li>
              <NavLink to="/entertainment" activeClassName="active">
                <FontAwesomeIcon icon={faFilm} />
                Entertainment
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tech-science" element={<TechScience />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/art-culture" element={<ArtCulture />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/entertainment" element={<Entertainment />} />
      </Routes>
    </Router>
  );
};

export default App;
