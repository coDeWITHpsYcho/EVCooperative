import React from 'react';
import { Link } from 'react-router-dom';
import { Car, ShoppingBag, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import styles from './Home.module.css';

const Home = () => {
  const features = [
    {
      icon: <Car size={48} />,
      title: 'EV Transport',
      description: 'Book eco-friendly rides or register as a driver to earn money',
      link: '/transport',
      color: '#4facfe'
    },
    {
      icon: <ShoppingBag size={48} />,
      title: 'Vehicle Marketplace',
      description: 'Buy and sell vehicles in a trusted marketplace',
      link: '/marketplace',
      color: '#43e97b'
    },
    {
      icon: <Users size={48} />,
      title: 'Rural Cooperative',
      description: 'Support local artisans and buy authentic handicrafts',
      link: '/cooperative',
      color: '#fa709a'
    }
  ];

  const benefits = [
    'Connect with verified drivers and sellers',
    'Support rural artisans and local economy',
    'Eco-friendly transportation options',
    'Secure payments and transactions',
    'Government scheme integration',
    '24/7 customer support'
  ];

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              <span className={styles.hindiTitle}>सहयोग</span>
              <span className={styles.subtitle}>Empowering Communities Through Digital Cooperation</span>
            </h1>
            <p className={styles.heroDescription}>
              Connect drivers, artisans, and entrepreneurs in one unified platform. 
              Book rides, buy authentic handicrafts, and support local businesses.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                Get Started
                <ArrowRight size={20} />
              </Link>
              <Link to="/transport" className={`${styles.btn} ${styles.btnSecondary}`}>
                Book a Ride
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.floatingCard}>
              <div className={styles.cardContent}>
                <div className={styles.cardIcon}>
                  <Car size={24} />
                </div>
                <div>
                  <h4>EV Transport</h4>
                  <p>Eco-friendly rides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Services</h2>
            <p className={styles.sectionDescription}>
              Three powerful platforms united for community empowerment
            </p>
          </div>
          
          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div 
                  className={styles.featureIcon}
                  style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                <Link to={feature.link} className={styles.featureLink}>
                  Explore <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefits}>
        <div className={styles.container}>
          <div className={styles.benefitsContent}>
            <div className={styles.benefitsText}>
              <h2 className={styles.sectionTitle}>Why Choose Sahayog?</h2>
              <p className={styles.sectionDescription}>
                Built for the Indian market with focus on rural empowerment and sustainability
              </p>
              <ul className={styles.benefitsList}>
                {benefits.map((benefit, index) => (
                  <li key={index} className={styles.benefitItem}>
                    <CheckCircle size={20} />
                    {benefit}
                  </li>
                ))}
              </ul>
              <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                Join Sahayog Today
              </Link>
            </div>
            <div className={styles.benefitsImage}>
              <div className={styles.statsCard}>
                <div className={styles.stat}>
                  <h3>10,000+</h3>
                  <p>Happy Users</p>
                </div>
                <div className={styles.stat}>
                  <h3>5,000+</h3>
                  <p>Completed Rides</p>
                </div>
                <div className={styles.stat}>
                  <h3>2,000+</h3>
                  <p>Artisan Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of users who are already part of the Sahayog community</p>
            <div className={styles.ctaButtons}>
              <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                Sign Up Now
              </Link>
              <Link to="/transport" className={`${styles.btn} ${styles.btnSecondary}`}>
                Book Your First Ride
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;