import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MarketplaceHome.module.css';

const MarketplaceHome = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch featured products and categories
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  const fetchFeaturedProducts = async () => {
    // Mock data - replace with actual API call
    const mockProducts = [
      {
        id: 1,
        name: 'Handwoven Silk Saree',
        price: 2500,
        image: '/api/placeholder/300/300',
        seller: 'Priya Textiles',
        rating: 4.8,
        location: 'Varanasi, UP'
      },
      {
        id: 2,
        name: 'Organic Turmeric Powder',
        price: 150,
        image: '/api/placeholder/300/300',
        seller: 'Rural Spices Co-op',
        rating: 4.9,
        location: 'Erode, TN'
      },
      {
        id: 3,
        name: 'Bamboo Handicrafts Set',
        price: 800,
        image: '/api/placeholder/300/300',
        seller: 'Green Crafts',
        rating: 4.7,
        location: 'Assam'
      },
      {
        id: 4,
        name: 'Handmade Cotton Kurta',
        price: 650,
        image: '/api/placeholder/300/300',
        seller: 'Village Weavers',
        rating: 4.6,
        location: 'Rajasthan'
      }
    ];
    setFeaturedProducts(mockProducts);
  };

  const fetchCategories = async () => {
    // Mock data - replace with actual API call
    const mockCategories = [
      { id: 1, name: 'Textiles & Clothing', icon: '👕', count: 1250 },
      { id: 2, name: 'Handicrafts', icon: '🎨', count: 890 },
      { id: 3, name: 'Organic Food', icon: '🌾', count: 650 },
      { id: 4, name: 'Jewelry', icon: '💍', count: 420 },
      { id: 5, name: 'Home Decor', icon: '🏠', count: 380 },
      { id: 6, name: 'Pottery', icon: '🏺', count: 290 }
    ];
    setCategories(mockCategories);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to search results
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover Rural India's Finest</h1>
          <p>Connect directly with artisans and farmers across India</p>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search for products, artisans, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              🔍
            </button>
          </form>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.heroPlaceholder}>
            🏛️
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <h2>Browse Categories</h2>
        <div className={styles.categoryGrid}>
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/marketplace/category/${category.id}`}
              className={styles.categoryCard}
            >
              <div className={styles.categoryIcon}>{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.count} products</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2>Featured Products</h2>
          <Link to="/marketplace/products" className={styles.viewAllLink}>
            View All →
          </Link>
        </div>
        <div className={styles.productGrid}>
          {featuredProducts.map(product => (
            <Link
              key={product.id}
              to={`/marketplace/product/${product.id}`}
              className={styles.productCard}
            >
              <div className={styles.productImage}>
                <div className={styles.imagePlaceholder}>📦</div>
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.seller}>by {product.seller}</p>
                <p className={styles.location}>📍 {product.location}</p>
                <div className={styles.rating}>
                  ⭐ {product.rating}
                </div>
                <div className={styles.price}>₹{product.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statItem}>
          <h3>10,000+</h3>
          <p>Active Artisans</p>
        </div>
        <div className={styles.statItem}>
          <h3>50,000+</h3>
          <p>Products Listed</p>
        </div>
        <div className={styles.statItem}>
          <h3>500+</h3>
          <p>Villages Connected</p>
        </div>
        <div className={styles.statItem}>
          <h3>₹5 Cr+</h3>
          <p>Revenue Generated</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Start Selling Your Products</h2>
          <p>Join thousands of artisans and farmers earning through our platform</p>
          <Link to="/marketplace/sell" className={styles.ctaButton}>
            Start Selling
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MarketplaceHome;