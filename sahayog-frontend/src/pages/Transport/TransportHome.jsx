import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Car, MapPin, Clock, Shield, Star, Users, Zap, Leaf } from 'lucide-react';
import styles from './TransportHome.module.css';

const TransportHome = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Zap size={32} />,
      title: 'Electric Vehicles',
      description: 'Eco-friendly rides with zero emissions',
      color: '#4facfe'
    },
    {
      icon: <Clock size={32} />,
      title: 'Quick Booking',
      description: 'Get a ride in under 5 minutes',
      color: '#43e97b'
    },
    {
      icon: <Shield size={32} />,
      title: 'Safe & Secure',
      description: 'Verified drivers and secure payments',
      color: '#fa709a'
    },
    {
      icon: <Star size={32} />,
      title: 'Rated Drivers',
      description: 'Top-rated professional drivers',
      color: '#ffd93d'
    }
  ];

  const vehicleTypes = [
    {
      type: 'EV Bike',
      description: 'Quick rides for 1-2 people',
      price: '₹8/km',
      time: '2-5 min',
      image: '🏍️'
    },
    {
      type: 'EV Auto',
      description: 'Comfortable rides for 2-3 people',
      price: '₹12/km',
      time: '3-7 min',
      image: '🛺'
    },
    {
      type: 'EV Car',
      description: 'Premium rides for up to 4 people',
      price: '₹15/km',
      time: '5-10 min',
      image: '🚗'
    }
  ];

  return (
    <div className={styles.transportHome}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Electric Vehicle Transport
              <span className={styles.heroSubtitle}>Clean, Fast, Reliable</span>
            </h1>
            <p className={styles.heroDescription}>
              Book eco-friendly rides with verified drivers. Supporting sustainable 
              transportation while connecting rural and urban communities.
            </p>
            <div className={styles.heroButtons}>
              {user ? (
                <>
                  <Link to="/transport/book" className={`${styles.btn} ${styles.btnPrimary}`}>
                    <MapPin size={20} />
                    Book a Ride
                  </Link>
                  <Link to="/transport/rides" className={`${styles.btn} ${styles.btnSecondary}`}>
                    My Rides
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                    Sign Up to Book
                  </Link>
                  <Link to="/login" className={`${styles.btn} ${styles.btnSecondary}`}>
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <h3>50,000+</h3>
              <p>Happy Riders</p>
            </div>
            <div className={styles.statItem}>
              <h3>5,000+</h3>
              <p>EV Drivers</p>
            </div>
            <div className={styles.statItem}>
              <h3>100+</h3>
              <p>Cities</p>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        {/* Features Section */}
        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Why Choose Our EV Transport?</h2>
          <div className={styles.featuresGrid}>
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
              </div>
            ))}
          </div>
        </section>

        {/* Vehicle Types */}
        <section className={styles.vehicleTypes}>
          <h2 className={styles.sectionTitle}>Choose Your Ride</h2>
          <div className={styles.vehicleGrid}>
            {vehicleTypes.map((vehicle, index) => (
              <div key={index} className={styles.vehicleCard}>
                <div className={styles.vehicleImage}>
                  <span>{vehicle.image}</span>
                </div>
                <div className={styles.vehicleInfo}>
                  <h3 className={styles.vehicleType}>{vehicle.type}</h3>
                  <p className={styles.vehicleDescription}>{vehicle.description}</p>
                  <div className={styles.vehicleDetails}>
                    <span className={styles.vehiclePrice}>{vehicle.price}</span>
                    <span className={styles.vehicleTime}>{vehicle.time} away</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Driver Section */}
        <section className={styles.driverSection}>
          <div className={styles.driverContent}>
            <div className={styles.driverText}>
              <h2 className={styles.sectionTitle}>Drive & Earn with Us</h2>
              <p className={styles.sectionDescription}>
                Join our community of EV drivers and start earning while contributing 
                to a cleaner environment. We provide training, support, and flexible working hours.
              </p>
              <ul className={styles.driverBenefits}>
                <li><Users size={16} /> Join 5000+ happy drivers</li>
                <li><Leaf size={16} /> Contribute to clean environment</li>
                <li><Clock size={16} /> Flexible working hours</li>
                <li><Star size={16} /> Earn up to ₹30,000/month</li>
              </ul>
              <div className={styles.driverButtons}>
                {user ? (
                  <Link to="/transport/driver" className={`${styles.btn} ${styles.btnPrimary}`}>
                    Driver Dashboard
                  </Link>
                ) : (
                  <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                    Become a Driver
                  </Link>
                )}
                <Link to="/transport/vehicles" className={`${styles.btn} ${styles.btnSecondary}`}>
                  Register Vehicle
                </Link>
              </div>
            </div>
            <div className={styles.driverImage}>
              <div className={styles.driverCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.driverAvatar}>👨‍💼</div>
                  <div>
                    <h4>Raj Kumar</h4>
                    <p>EV Driver • 4.9 ⭐</p>
                  </div>
                </div>
                <div className={styles.cardStats}>
                  <div className={styles.cardStat}>
                    <span>2,450</span>
                    <p>Trips</p>
                  </div>
                  <div className={styles.cardStat}>
                    <span>₹45,000</span>
                    <p>This Month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <h2>Ready for Your Next Ride?</h2>
            <p>Experience the future of transportation with our EV fleet</p>
            <Link to="/transport/book" className={`${styles.btn} ${styles.btnPrimary}`}>
              Book Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TransportHome;