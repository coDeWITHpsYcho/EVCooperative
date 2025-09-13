import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Car, Package, Users, TrendingUp, Calendar, MapPin, 
  Star, DollarSign, Activity, Bell, Settings, User 
} from 'lucide-react';
import { transportAPI, marketplaceAPI, cooperativeAPI } from '../services/api';
import { formatCurrency, formatDate } from '../utils/helpers';
import { USER_TYPES } from '../utils/constants';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    rides: 0,
    products: 0,
    earnings: 0,
    rating: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load different data based on user type
      if (user?.user?.user_type === USER_TYPES.DRIVER) {
        const ridesResponse = await transportAPI.getRides();
        setStats(prev => ({
          ...prev,
          rides: ridesResponse.data.results?.length || 0
        }));
        setRecentActivities(ridesResponse.data.results?.slice(0, 5) || []);
      } else if (user?.user?.user_type === USER_TYPES.VENDOR) {
        const productsResponse = await marketplaceAPI.getMyProducts();
        setStats(prev => ({
          ...prev,
          products: productsResponse.data.length || 0
        }));
      } else if (user?.user?.user_type === USER_TYPES.COOPERATIVE_MEMBER) {
        const productsResponse = await cooperativeAPI.getMyProducts();
        setStats(prev => ({
          ...prev,
          products: productsResponse.data.length || 0
        }));
      } else {
        const ridesResponse = await transportAPI.getRides();
        setRecentActivities(ridesResponse.data.results?.slice(0, 5) || []);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getQuickActions = () => {
    const userType = user?.user?.user_type;
    
    switch (userType) {
      case USER_TYPES.DRIVER:
        return [
          { icon: <Car />, title: 'Go Online', link: '/transport/driver', color: '#4facfe' },
          { icon: <Package />, title: 'My Vehicles', link: '/transport/vehicles', color: '#43e97b' },
          { icon: <TrendingUp />, title: 'Earnings', link: '/transport/earnings', color: '#fa709a' },
          { icon: <Star />, title: 'Ratings', link: '/transport/ratings', color: '#ffd93d' }
        ];
      
      case USER_TYPES.VENDOR:
        return [
          { icon: <Package />, title: 'Add Product', link: '/marketplace/sell', color: '#4facfe' },
          { icon: <Activity />, title: 'My Products', link: '/marketplace/my-products', color: '#43e97b' },
          { icon: <DollarSign />, title: 'Sales', link: '/marketplace/sales', color: '#fa709a' },
          { icon: <Bell />, title: 'Inquiries', link: '/marketplace/inquiries', color: '#ffd93d' }
        ];
      
      case USER_TYPES.COOPERATIVE_MEMBER:
        return [
          { icon: <Package />, title: 'Add Product', link: '/cooperative/artisan', color: '#4facfe' },
          { icon: <Users />, title: 'My Products', link: '/cooperative/my-products', color: '#43e97b' },
          { icon: <TrendingUp />, title: 'Orders', link: '/cooperative/orders', color: '#fa709a' },
          { icon: <Settings />, title: 'Support', link: '/cooperative/support', color: '#ffd93d' }
        ];
      
      default:
        return [
          { icon: <Car />, title: 'Book Ride', link: '/transport/book', color: '#4facfe' },
          { icon: <Package />, title: 'Shop Products', link: '/marketplace', color: '#43e97b' },
          { icon: <Users />, title: 'Handicrafts', link: '/cooperative', color: '#fa709a' },
          { icon: <Activity />, title: 'My Orders', link: '/orders', color: '#ffd93d' }
        ];
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>
              Welcome back, {user?.user?.first_name || user?.user?.username}!
            </h1>
            <p className={styles.welcomeSubtitle}>
              Here's what's happening with your account today.
            </p>
          </div>
          <div className={styles.profileSection}>
            <Link to="/profile" className={styles.profileButton}>
              <User size={20} />
              View Profile
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#4facfe20', color: '#4facfe' }}>
              <Car size={24} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.rides}</h3>
              <p className={styles.statLabel}>
                {user?.user?.user_type === USER_TYPES.DRIVER ? 'Completed Rides' : 'Total Rides'}
              </p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#43e97b20', color: '#43e97b' }}>
              <Package size={24} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.products}</h3>
              <p className={styles.statLabel}>Products Listed</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#fa709a20', color: '#fa709a' }}>
              <DollarSign size={24} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{formatCurrency(stats.earnings)}</h3>
              <p className={styles.statLabel}>Total Earnings</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: '#ffd93d20', color: '#ffd93d' }}>
              <Star size={24} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{stats.rating.toFixed(1)}</h3>
              <p className={styles.statLabel}>Average Rating</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.quickActionsGrid}>
            {getQuickActions().map((action, index) => (
              <Link key={index} to={action.link} className={styles.quickActionCard}>
                <div 
                  className={styles.quickActionIcon}
                  style={{ backgroundColor: `${action.color}20`, color: action.color }}
                >
                  {action.icon}
                </div>
                <span className={styles.quickActionTitle}>{action.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent Activity</h2>
          <div className={styles.activityList}>
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    <Activity size={16} />
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityTitle}>
                      {activity.status === 'completed' ? 'Ride completed' : `Ride ${activity.status}`}
                    </p>
                    <p className={styles.activityMeta}>
                      {formatDate(activity.requested_at)} • {formatCurrency(activity.estimated_fare)}
                    </p>
                  </div>
                  <div className={styles.activityBadge}>
                    {activity.status}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <Activity size={48} />
                <h3>No recent activity</h3>
                <p>Your recent activities will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;