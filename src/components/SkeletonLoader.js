// src/components/SkeletonLoader.js
import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-thumbnail"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-text"></div>
    </div>
  );
};

export default SkeletonLoader;
