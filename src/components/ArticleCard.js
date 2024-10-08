// src/components/ArticleCard.js
import React from 'react';
import './ArticleCard.css';

const ArticleCard = ({ title, imageUrl, description }) => {
  return (
    <div className="article-card">
      <img src={imageUrl} alt={title} />
      <div className="article-content">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
