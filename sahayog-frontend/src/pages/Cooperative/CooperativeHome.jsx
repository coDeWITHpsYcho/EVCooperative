import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CooperativeHome.module.css';

const CooperativeHome = () => {
  const [cooperatives, setCooperatives] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setCooperatives([
        {
          id: 1,
          name: "Rural Artisan Collective",
          location: "Maharashtra",
          members: 45,
          products: 120,
          image: "/api/placeholder/300/200",
          rating: 4.8,
          description: "Traditional handloom and handicraft cooperative"
        },
        {
          id: 2,
          name: "Organic Farmers Union",
          location: "Punjab",
          members: 78,
          products: 85,
          image: "/api/placeholder/300/200",
          rating: 4.6,
          description: "Certified organic produce and dairy products"
        },
        {
          id: 3,
          name: "Women's Textile Co-op",
          location: "Gujarat",
          members: 32,
          products: 95,
          image: "/api/placeholder/300/200",
          rating: 4.9,
          description: "Sustainable textile and clothing manufacturing"
        }
      ]);

      setFeaturedProducts([
        {
          id: 1,
          name: "Handwoven Silk Saree",
          price: 4500,
          cooperative: "Rural Artisan Collective",
          image: "/api/placeholder/200/200",
          rating: 4.8
        },
        {
          id: 2,
          name: "Organic Basmati Rice",
          price: 180,
          cooperative: "Organic Farmers Union",
          image: "/api/placeholder/200/200",
          rating: 4.7
        },
        {
          id: 3,
          name: "Cotton Kurta Set",
          price: 1200,
          cooperative: "Women's Textile Co-op",
          image: "/api/placeholder/200/200",
          rating: 4.9
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading cooperatives...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Empowering Rural Communities</h1>
          <p>
            Connect directly with rural cooperatives and support local artisans, 
            farmers, and small businesses across India. Every purchase makes a difference.
          </p>
          <div className={styles.heroActions}>
            <Link to="/cooperative/registration" className={styles.ctaButton}>
              Join as Cooperative
            </Link>
            <Link to="/marketplace" className={styles.ctaButtonSecondary}>
              Shop Products
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src="/api/placeholder/600/400" alt="Rural cooperative workers" />
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>150+</h3>
            <p>Active Cooperatives</p>
          </div>
          <div className={styles.statCard}>
            <h3>5,000+</h3>
            <p>Artisan Members</p>
          </div>
          <div className={styles.statCard}>
            <h3>₹2.5Cr+</h3>
            <p>Revenue Generated</p>
          </div>
          <div className={styles.statCard}>
            <h3>50,000+</h3>
            <p>Products Sold</p>
          </div>
        </div>
      </section>

      {/* Featured Cooperatives */}
      <section className={styles.cooperatives}>
        <div className={styles.sectionHeader}>
          <h2>Featured Cooperatives</h2>
          <Link to="/cooperative/all" className={styles.viewAll}>View All</Link>
        </div>
        <div className={styles.cooperativeGrid}>
          {cooperatives.map(coop => (
            <div key={coop.id} className={styles.cooperativeCard}>
              <img src={coop.image} alt={coop.name} />
              <div className={styles.cardContent}>
                <h3>{coop.name}</h3>
                <p className={styles.location}>📍 {coop.location}</p>
                <p className={styles.description}>{coop.description}</p>
                <div className={styles.stats}>
                  <span>{coop.members} Members</span>
                  <span>{coop.products} Products</span>
                  <span>⭐ {coop.rating}</span>
                </div>
                <Link to={`/cooperative/${coop.id}`} className={styles.viewButton}>
                  View Cooperative
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.products}>
        <div className={styles.sectionHeader}>
          <h2>Featured Products</h2>
          <Link to="/marketplace" className={styles.viewAll}>View All</Link>
        </div>
        <div className={styles.productGrid}>
          {featuredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <img src={product.image} alt={product.name} />
              <div className={styles.productInfo}>
                <h4>{product.name}</h4>
                <p className={styles.cooperative}>by {product.cooperative}</p>
                <div className={styles.priceRating}>
                  <span className={styles.price}>₹{product.price}</span>
                  <span className={styles.rating}>⭐ {product.rating}</span>
                </div>
                <Link to={`/marketplace/product/${product.id}`} className={styles.buyButton}>
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepIcon}>1</div>
            <h3>Register Cooperative</h3>
            <p>Join our platform and verify your cooperative credentials</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>2</div>
            <h3>List Products</h3>
            <p>Upload your products with detailed descriptions and fair pricing</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>3</div>
            <h3>Reach Customers</h3>
            <p>Connect with customers across India who value authentic products</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>4</div>
            <h3>Grow Together</h3>
            <p>Build sustainable livelihoods and strengthen rural communities</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CooperativeHome;