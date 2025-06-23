import React from 'react';
import './CategoryNavbar.css';

const CategoryNavbar = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <nav className="category-navbar">
      <ul className="category-menu">
        {categories.map(category => (
          <li
            key={category}
            className={`category-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavbar;