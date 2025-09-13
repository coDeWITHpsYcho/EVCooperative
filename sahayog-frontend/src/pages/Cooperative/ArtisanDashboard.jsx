import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ArtisanDashboard.module.css';

const ArtisanDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setDashboardData({
        artisan: {
          name: "Meera Sharma",
          cooperative: "Rural Artisan Collective",
          location: "Nashik, Maharashtra",
          joinDate: "2020-03-15",
          avatar: "/api/placeholder/100/100",
          specialization: "Handloom Textiles"
        },
        stats: {
          totalProducts: 24,
          totalSales: 156,
          totalEarnings: 125600,
          monthlyEarnings: 18450,
          rating: 4.8,
          reviewCount: 89
        }
      });

      setRecentOrders([
        {
          id: "ORD-001",
          product: "Handwoven Silk Saree",
          customer: "Priya Patel",
          amount: 4500,
          status: "completed",
          date: "2024-07-28",
          quantity: 1
        },
        {
          id: "ORD-002",
          product: "Cotton Kurta Set",
          customer: "Rajesh Kumar",
          amount: 1200,
          status: "processing",
          date: "2024-07-27",
          quantity: 2
        },
        {
          id: "ORD-003",
          product: "Bamboo Basket",
          customer: "Anjali Singh",
          amount: 800,
          status: "shipped",
          date: "2024-07-26",
          quantity: 1
        },
        {
          id: "ORD-004",
          product: "Ceramic Tea Set",
          customer: "Vikram Reddy",
          amount: 1200,
          status: "pending",
          date: "2024-07-25",
          quantity: 1
        }
      ]);

      setProducts([
        {
          id: 1,
          name: "Handwoven Silk Saree",
          price: 4500,
          stock: 12,
          sales: 45,
          status: "active",
          image: "/api/placeholder/100/100",
          rating: 4.8
        },
        {
          id: 2,
          name: "Cotton Kurta Set",
          price: 1200,
          stock: 8,
          sales: 32,
          status: "active",
          image: "/api/placeholder/100/100",
          rating: 4.6
        },
        {
          id: 3,
          name: "Bamboo Basket",
          price: 800,
          stock: 0,
          sales: 28,
          status: "out_of_stock",
          image: "/api/placeholder/100/100",
          rating: 4.7
        },
        {
          id: 4,
          name: "Ceramic Tea Set",
          price: 1200,
          stock: 15,
          sales: 21,
          status: "active",
          image: "/api/placeholder/100/100",
          rating: 4.5
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'processing': return '#f59e0b';
      case 'shipped': return '#3b82f6';
      case 'pending': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img src={dashboardData.artisan.avatar} alt={dashboardData.artisan.name} />
          <div>
            <h1>Welcome back, {dashboardData.artisan.name}!</h1>
            <p>{dashboardData.artisan.specialization} • {dashboardData.artisan.cooperative}</p>
            <span className={styles.location}>📍 {dashboardData.artisan.location}</span>
          </div>
        </div>
        <div className={styles.quickActions}>
          <Link to="/marketplace/sell" className={styles.actionButton}>
            Add New Product
          </Link>
          <Link to="/cooperative/profile" className={styles.actionButtonSecondary}>
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statContent}>
            <h3>{dashboardData.stats.totalProducts}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>🛒</div>
          <div className={styles.statContent}>
            <h3>{dashboardData.stats.totalSales}</h3>
            <p>Total Sales</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statContent}>
            <h3>₹{dashboardData.stats.totalEarnings.toLocaleString()}</h3>
            <p>Total Earnings</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statContent}>
            <h3>₹{dashboardData.stats.monthlyEarnings.toLocaleString()}</h3>
            <p>This Month</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statContent}>
            <h3>{dashboardData.stats.rating}</h3>
            <p>{dashboardData.stats.reviewCount} Reviews</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'orders' ? styles.active : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Recent Orders
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'products' ? styles.active : ''}`}
          onClick={() => setActiveTab('products')}
        >
          My Products
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className={styles.tabContent}>
          <div className={styles.overviewGrid}>
            {/* Recent Orders Summary */}
            <div className={styles.card}>
              <h3>Recent Orders</h3>
              <div className={styles.ordersList}>
                {recentOrders.slice(0, 3).map(order => (
                  <div key={order.id} className={styles.orderItem}>
                    <div className={styles.orderInfo}>
                      <span className={styles.orderId}>{order.id}</span>
                      <span className={styles.orderProduct}>{order.product}</span>
                    </div>
                    <div className={styles.orderMeta}>
                      <span className={styles.orderAmount}>₹{order.amount}</span>
                      <span 
                        className={styles.orderStatus}
                        style={{ color: getStatusColor(order.status) }}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="#" className={styles.viewAll} onClick={() => setActiveTab('orders')}>
                View All Orders
              </Link>
            </div>

            {/* Top Products */}
            <div className={styles.card}>
              <h3>Top Performing Products</h3>
              <div className={styles.productsList}>
                {products.slice(0, 3).map(product => (
                  <div key={product.id} className={styles.productItem}>
                    <img src={product.image} alt={product.name} />
                    <div className={styles.productInfo}>
                      <span className={styles.productName}>{product.name}</span>
                      <span className={styles.productSales}>{product.sales} sales</span>
                    </div>
                    <span className={styles.productPrice}>₹{product.price}</span>
                  </div>
                ))}
              </div>
              <Link to="#" className={styles.viewAll} onClick={() => setActiveTab('products')}>
                View All Products
              </Link>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className={styles.tabContent}>
          <div className={styles.card}>
            <h3>All Orders</h3>
            <div className={styles.ordersTable}>
              <div className={styles.tableHeader}>
                <span>Order ID</span>
                <span>Product</span>
                <span>Customer</span>
                <span>Amount</span>
                <span>Status</span>
                <span>Date</span>
              </div>
              {recentOrders.map(order => (
                <div key={order.id} className={styles.tableRow}>
                  <span className={styles.orderId}>{order.id}</span>
                  <span>{order.product}</span>
                  <span>{order.customer}</span>
                  <span className={styles.amount}>₹{order.amount}</span>
                  <span 
                    className={styles.status}
                    style={{ 
                      color: getStatusColor(order.status),
                      background: `${getStatusColor(order.status)}15`
                    }}
                  >
                    {getStatusText(order.status)}
                  </span>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className={styles.tabContent}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>My Products</h3>
              <Link to="/marketplace/sell" className={styles.addButton}>
                Add New Product
              </Link>
            </div>
            <div className={styles.productsGrid}>
              {products.map(product => (
                <div key={product.id} className={styles.productCard}>
                  <img src={product.image} alt={product.name} />
                  <div className={styles.productContent}>
                    <h4>{product.name}</h4>
                    <div className={styles.productMeta}>
                      <span className={styles.price}>₹{product.price}</span>
                      <span className={styles.rating}>⭐ {product.rating}</span>
                    </div>
                    <div className={styles.productStats}>
                      <span>Stock: {product.stock}</span>
                      <span>Sales: {product.sales}</span>
                    </div>
                    <div className={styles.productStatus}>
                      <span 
                        className={`${styles.statusBadge} ${
                          product.status === 'active' ? styles.active : 
                          product.status === 'out_of_stock' ? styles.outOfStock : ''
                        }`}
                      >
                        {product.status === 'active' ? 'Active' : 
                         product.status === 'out_of_stock' ? 'Out of Stock' : product.status}
                      </span>
                    </div>
                    <div className={styles.productActions}>
                      <button className={styles.editButton}>Edit</button>
                      <button className={styles.viewButton}>View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanDashboard;