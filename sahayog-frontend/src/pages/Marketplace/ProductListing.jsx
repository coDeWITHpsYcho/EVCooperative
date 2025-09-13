import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './ProductListing.module.css';

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: searchParams.get('priceRange') || '',
    location: searchParams.get('location') || '',
    rating: searchParams.get('rating') || '',
    sortBy: searchParams.get('sortBy') || 'relevance'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    'All Categories',
    'Textiles & Clothing',
    'Handicrafts',
    'Organic Food',
    'Jewelry',
    'Home Decor',
    'Pottery'
  ];

  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under ₹500', value: '0-500' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: '₹1000 - ₹2500', value: '1000-2500' },
    { label: '₹2500 - ₹5000', value: '2500-5000' },
    { label: 'Above ₹5000', value: '5000+' }
  ];

  const sortOptions = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Rating', value: 'rating' },
    { label: 'Newest First', value: 'newest' }
  ];

  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      const mockProducts = [
        {
          id: 1,
          name: 'Handwoven Silk Saree',
          price: 2500,
          originalPrice: 3000,
          image: '/api/placeholder/300/300',
          seller: 'Priya Textiles',
          rating: 4.8,
          reviews: 124,
          location: 'Varanasi, UP',
          category: 'Textiles & Clothing',
          isNew: false,
          discount: 17
        },
        {
          id: 2,
          name: 'Organic Turmeric Powder - 500g',
          price: 150,
          originalPrice: 180,
          image: '/api/placeholder/300/300',
          seller: 'Rural Spices Co-op',
          rating: 4.9,
          reviews: 89,
          location: 'Erode, TN',
          category: 'Organic Food',
          isNew: true,
          discount: 17
        },
        {
          id: 3,
          name: 'Bamboo Handicrafts Set',
          price: 800,
          originalPrice: 1000,
          image: '/api/placeholder/300/300',
          seller: 'Green Crafts',
          rating: 4.7,
          reviews: 56,
          location: 'Assam',
          category: 'Handicrafts',
          isNew: false,
          discount: 20
        },
        {
          id: 4,
          name: 'Handmade Cotton Kurta',
          price: 650,
          originalPrice: 850,
          image: '/api/placeholder/300/300',
          seller: 'Village Weavers',
          rating: 4.6,
          reviews: 78,
          location: 'Rajasthan',
          category: 'Textiles & Clothing',
          isNew: false,
          discount: 24
        },
        {
          id: 5,
          name: 'Traditional Clay Pot Set',
          price: 450,
          originalPrice: 550,
          image: '/api/placeholder/300/300',
          seller: 'Pottery Masters',
          rating: 4.5,
          reviews: 34,
          location: 'Gujarat',
          category: 'Pottery',
          isNew: true,
          discount: 18
        },
        {
          id: 6,
          name: 'Silver Oxidized Earrings',
          price: 1200,
          originalPrice: 1500,
          image: '/api/placeholder/300/300',
          seller: 'Artisan Jewelers',
          rating: 4.8,
          reviews: 67,
          location: 'Rajasthan',
          category: 'Jewelry',
          isNew: false,
          discount: 20
        }
      ];
      
      setProducts(mockProducts);
      setTotalPages(5); // Mock pagination
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    setCurrentPage(1);
    
    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) newSearchParams.set(key, val);
    });
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      location: '',
      rating: '',
      sortBy: 'relevance'
    });
    setSearchParams({});
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Marketplace</h1>
        <p>Discover authentic products from rural artisans</p>
      </div>

      <div className={styles.content}>
        {/* Filters Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filterSection}>
            <h3>Filters</h3>
            <button onClick={clearFilters} className={styles.clearFilters}>
              Clear All
            </button>
          </div>

          <div className={styles.filterGroup}>
            <h4>Category</h4>
            {categories.map(category => (
              <label key={category} className={styles.filterOption}>
                <input
                  type="radio"
                  name="category"
                  value={category === 'All Categories' ? '' : category}
                  checked={filters.category === (category === 'All Categories' ? '' : category)}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                />
                {category}
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h4>Price Range</h4>
            {priceRanges.map(range => (
              <label key={range.value} className={styles.filterOption}>
                <input
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={filters.priceRange === range.value}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                />
                {range.label}
              </label>
            ))}
          </div>

          <div className={styles.filterGroup}>
            <h4>Rating</h4>
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className={styles.filterOption}>
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating.toString()}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                />
                {rating}+ Stars
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          <div className={styles.toolbar}>
            <div className={styles.resultsInfo}>
              Showing {products.length} products
            </div>
            <div className={styles.sortContainer}>
              <label>Sort by:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className={styles.sortSelect}
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {products.map(product => (
                <Link
                  key={product.id}
                  to={`/marketplace/product/${product.id}`}
                  className={styles.productCard}
                >
                  <div className={styles.productImage}>
                    <div className={styles.imagePlaceholder}>📦</div>
                    {product.isNew && (
                      <span className={styles.newBadge}>New</span>
                    )}
                    {product.discount > 0 && (
                      <span className={styles.discountBadge}>
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className={styles.productInfo}>
                    <h3>{product.name}</h3>
                    <p className={styles.seller}>by {product.seller}</p>
                    <p className={styles.location}>📍 {product.location}</p>
                    <div className={styles.rating}>
                      <span>⭐ {product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                    <div className={styles.priceContainer}>
                      <span className={styles.price}>₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className={styles.originalPrice}>
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              Previous
            </button>
            {[...Array(Math.min(5, totalPages))].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`${styles.pageButton} ${
                  currentPage === i + 1 ? styles.activePage : ''
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListing;