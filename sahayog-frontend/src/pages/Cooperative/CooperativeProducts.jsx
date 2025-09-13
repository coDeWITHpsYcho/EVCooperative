import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CooperativeProducts.module.css';

const CooperativeProducts = () => {
  const { id } = useParams();
  const [cooperative, setCooperative] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sortBy: 'newest'
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      const mockCooperative = {
        id: 1,
        name: "Rural Artisan Collective",
        location: "Maharashtra",
        members: 45,
        founded: "2018",
        description: "We are a collective of traditional artisans specializing in handloom textiles, pottery, and handicrafts. Our mission is to preserve traditional Indian crafts while providing sustainable livelihoods to rural communities.",
        image: "/api/placeholder/800/400",
        rating: 4.8,
        totalProducts: 120,
        totalSales: 2500,
        certifications: ["Fair Trade", "Organic", "Handmade"],
        contact: {
          phone: "+91-9876543210",
          email: "contact@ruralartisan.coop",
          address: "Village Craftpur, Dist. Nashik, Maharashtra - 422001"
        }
      };

      const mockProducts = [
        {
          id: 1,
          name: "Handwoven Silk Saree",
          price: 4500,
          originalPrice: 5500,
          category: "textiles",
          image: "/api/placeholder/300/300",
          rating: 4.8,
          reviews: 24,
          inStock: true,
          description: "Beautiful handwoven silk saree with traditional motifs",
          colors: ["Red", "Blue", "Green"],
          sizes: ["Free Size"]
        },
        {
          id: 2,
          name: "Ceramic Tea Set",
          price: 1200,
          originalPrice: 1500,
          category: "pottery",
          image: "/api/placeholder/300/300",
          rating: 4.6,
          reviews: 18,
          inStock: true,
          description: "Hand-painted ceramic tea set with traditional designs",
          colors: ["White", "Blue"],
          sizes: ["Standard"]
        },
        {
          id: 3,
          name: "Bamboo Basket Set",
          price: 800,
          originalPrice: 1000,
          category: "handicrafts",
          image: "/api/placeholder/300/300",
          rating: 4.7,
          reviews: 32,
          inStock: false,
          description: "Eco-friendly bamboo baskets for storage and decoration",
          colors: ["Natural"],
          sizes: ["Small", "Medium", "Large"]
        },
        {
          id: 4,
          name: "Cotton Kurta",
          price: 1500,
          originalPrice: 1800,
          category: "textiles",
          image: "/api/placeholder/300/300",
          rating: 4.9,
          reviews: 41,
          inStock: true,
          description: "Comfortable cotton kurta with hand-block printing",
          colors: ["White", "Cream", "Light Blue"],
          sizes: ["S", "M", "L", "XL"]
        },
        {
          id: 5,
          name: "Wooden Jewelry Box",
          price: 2200,
          originalPrice: 2800,
          category: "handicrafts",
          image: "/api/placeholder/300/300",
          rating: 4.5,
          reviews: 15,
          inStock: true,
          description: "Intricately carved wooden jewelry box with mirror",
          colors: ["Natural Wood", "Dark Brown"],
          sizes: ["Standard"]
        },
        {
          id: 6,
          name: "Hand-painted Pottery Vase",
          price: 950,
          originalPrice: 1200,
          category: "pottery",
          image: "/api/placeholder/300/300",
          rating: 4.8,
          reviews: 28,
          inStock: true,
          description: "Beautiful hand-painted ceramic vase with floral designs",
          colors: ["Blue", "Green", "Red"],
          sizes: ["Small", "Large"]
        }
      ];

      setCooperative(mockCooperative);
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Filter by price range
    if (filters.priceRange !== 'all') {
      switch (filters.priceRange) {
        case 'under1000':
          filtered = filtered.filter(product => product.price < 1000);
          break;
        case '1000to3000':
          filtered = filtered.filter(product => product.price >= 1000 && product.price <= 3000);
          break;
        case 'above3000':
          filtered = filtered.filter(product => product.price > 3000);
          break;
        default:
          break;
      }
    }

    // Sort products
    switch (filters.sortBy) {
      case 'priceLow':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Keep original order for newest
        break;
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading cooperative details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/cooperative">Cooperatives</Link>
        <span>›</span>
        <span>{cooperative.name}</span>
      </div>

      {/* Cooperative Header */}
      <section className={styles.cooperativeHeader}>
        <div className={styles.headerImage}>
          <img src={cooperative.image} alt={cooperative.name} />
        </div>
        <div className={styles.cooperativeInfo}>
          <h1>{cooperative.name}</h1>
          <p className={styles.location}>📍 {cooperative.location}</p>
          <div className={styles.rating}>
            <span className={styles.stars}>⭐ {cooperative.rating}</span>
            <span className={styles.members}>{cooperative.members} Members</span>
            <span className={styles.founded}>Est. {cooperative.founded}</span>
          </div>
          <p className={styles.description}>{cooperative.description}</p>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.number}>{cooperative.totalProducts}</span>
              <span className={styles.label}>Products</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}>{cooperative.totalSales}+</span>
              <span className={styles.label}>Sales</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.number}>{cooperative.rating}</span>
              <span className={styles.label}>Rating</span>
            </div>
          </div>

          <div className={styles.certifications}>
            {cooperative.certifications.map((cert, index) => (
              <span key={index} className={styles.certification}>{cert}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className={styles.filtersSection}>
        <div className={styles.filtersContainer}>
          <div className={styles.filterGroup}>
            <label>Category:</label>
            <select 
              value={filters.category} 
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="textiles">Textiles</option>
              <option value="pottery">Pottery</option>
              <option value="handicrafts">Handicrafts</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Price Range:</label>
            <select 
              value={filters.priceRange} 
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under1000">Under ₹1,000</option>
              <option value="1000to3000">₹1,000 - ₹3,000</option>
              <option value="above3000">Above ₹3,000</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Sort By:</label>
            <select 
              value={filters.sortBy} 
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        <div className={styles.resultsCount}>
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img src={product.image} alt={product.name} />
                {!product.inStock && <div className={styles.outOfStock}>Out of Stock</div>}
                {product.originalPrice > product.price && (
                  <div className={styles.discount}>
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                
                <div className={styles.priceSection}>
                  <span className={styles.currentPrice}>₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                  )}
                </div>
                
                <div className={styles.ratingSection}>
                  <span className={styles.rating}>⭐ {product.rating}</span>
                  <span className={styles.reviews}>({product.reviews} reviews)</span>
                </div>
                
                <div className={styles.productOptions}>
                  {product.colors.length > 1 && (
                    <div className={styles.colors}>
                      <span>Colors:</span>
                      {product.colors.slice(0, 3).map((color, index) => (
                        <span key={index} className={styles.colorOption}>{color}</span>
                      ))}
                      {product.colors.length > 3 && <span>+{product.colors.length - 3}</span>}
                    </div>
                  )}
                  
                  {product.sizes.length > 1 && (
                    <div className={styles.sizes}>
                      <span>Sizes:</span>
                      {product.sizes.slice(0, 3).map((size, index) => (
                        <span key={index} className={styles.sizeOption}>{size}</span>
                      ))}
                      {product.sizes.length > 3 && <span>+{product.sizes.length - 3}</span>}
                    </div>
                  )}
                </div>
                
                <div className={styles.productActions}>
                  <Link 
                    to={`/marketplace/product/${product.id}`} 
                    className={styles.viewButton}
                  >
                    View Details
                  </Link>
                  <button 
                    className={`${styles.addToCart} ${!product.inStock ? styles.disabled : ''}`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className={styles.noProducts}>
            <h3>No products found</h3>
            <p>Try adjusting your filters to see more products.</p>
          </div>
        )}
      </section>

      {/* Contact Information */}
      <section className={styles.contactSection}>
        <h2>Contact Cooperative</h2>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <span className={styles.icon}>📞</span>
            <div>
              <strong>Phone</strong>
              <p>{cooperative.contact.phone}</p>
            </div>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.icon}>✉️</span>
            <div>
              <strong>Email</strong>
              <p>{cooperative.contact.email}</p>
            </div>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.icon}>📍</span>
            <div>
              <strong>Address</strong>
              <p>{cooperative.contact.address}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CooperativeProducts;