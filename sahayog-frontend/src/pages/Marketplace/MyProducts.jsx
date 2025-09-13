import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './MyProducts.module.css';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      // Mock API call - replace with actual API
      const mockProducts = [
        {
          id: 1,
          name: 'Handwoven Silk Saree',
          price: 2500,
          originalPrice: 3000,
          image: '/api/placeholder/300/300',
          status: 'active',
          stock: 15,
          views: 234,
          orders: 12,
          rating: 4.8,
          dateAdded: '2024-01-15',
          category: 'Textiles & Clothing'
        },
        {
          id: 2,
          name: 'Organic Turmeric Powder',
          price: 150,
          originalPrice: 180,
          image: '/api/placeholder/300/300',
          status: 'pending',
          stock: 50,
          views: 89,
          orders: 5,
          rating: 4.9,
          dateAdded: '2024-01-20',
          category: 'Organic Food'
        },
        {
          id: 3,
          name: 'Bamboo Handicraft Set',
          price: 800,
          originalPrice: 1000,
          image: '/api/placeholder/300/300',
          status: 'inactive',
          stock: 0,
          views: 156,
          orders: 8,
          rating: 4.7,
          dateAdded: '2024-01-10',
          category: 'Handicrafts'
        },
        {
          id: 4,
          name: 'Handmade Cotton Kurta',
          price: 650,
          originalPrice: 850,
          image: '/api/placeholder/300/300',
          status: 'active',
          stock: 25,
          views: 178,
          orders: 15,
          rating: 4.6,
          dateAdded: '2024-01-12',
          category: 'Textiles & Clothing'
        }
      ];
      setProducts(mockProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (productId, newStatus) => {
    try {
      // Update product status
      setProducts(prev => prev.map(product => 
        product.id === productId ? { ...product, status: newStatus } : product
      ));
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const handleBulkAction = async (action) => {
    try {
      switch (action) {
        case 'activate':
          setProducts(prev => prev.map(product => 
            selectedProducts.includes(product.id) 
              ? { ...product, status: 'active' } 
              : product
          ));
          break;
        case 'deactivate':
          setProducts(prev => prev.map(product => 
            selectedProducts.includes(product.id) 
              ? { ...product, status: 'inactive' } 
              : product
          ));
          break;
        case 'delete':
          setProducts(prev => prev.filter(product => 
            !selectedProducts.includes(product.id)
          ));
          break;
      }
      setSelectedProducts([]);
    } catch (error) {
      console.error('Error performing bulk action:', error);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    const filteredProducts = getFilteredProducts();
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id));
    }
  };

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'active':
        return products.filter(p => p.status === 'active');
      case 'pending':
        return products.filter(p => p.status === 'pending');
      case 'inactive':
        return products.filter(p => p.status === 'inactive');
      default:
        return products;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'inactive': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const filteredProducts = getFilteredProducts();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading your products...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>My Products</h1>
          <p>Manage your product listings</p>
        </div>
        <Link to="/marketplace/sell" className={styles.addProductButton}>
          + Add New Product
        </Link>
      </div>

      <div className={styles.content}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
          <div className={styles.statCard}>
            <h3>{products.filter(p => p.status === 'active').length}</h3>
            <p>Active Products</p>
          </div>
          <div className={styles.statCard}>
            <h3>{products.reduce((sum, p) => sum + p.orders, 0)}</h3>
            <p>Total Orders</p>
          </div>
          <div className={styles.statCard}>
            <h3>₹{products.reduce((sum, p) => sum + (p.price * p.orders), 0)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All ({products.length})
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'active' ? styles.active : ''}`}
              onClick={() => setActiveTab('active')}
            >
              Active ({products.filter(p => p.status === 'active').length})
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'pending' ? styles.active : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending ({products.filter(p => p.status === 'pending').length})
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'inactive' ? styles.active : ''}`}
              onClick={() => setActiveTab('inactive')}
            >
              Inactive ({products.filter(p => p.status === 'inactive').length})
            </button>
          </div>

          {selectedProducts.length > 0 && (
            <div className={styles.bulkActions}>
              <span>{selectedProducts.length} selected</span>
              <button onClick={() => handleBulkAction('activate')}>Activate</button>
              <button onClick={() => handleBulkAction('deactivate')}>Deactivate</button>
              <button 
                onClick={() => handleBulkAction('delete')}
                className={styles.dangerButton}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📦</div>
            <h3>No products found</h3>
            <p>Start selling by adding your first product</p>
            <Link to="/marketplace/sell" className={styles.addFirstProduct}>
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className={styles.productsTable}>
            <div className={styles.tableHeader}>
              <div className={styles.selectColumn}>
                <input
                  type="checkbox"
                  checked={selectedProducts.length === filteredProducts.length}
                  onChange={handleSelectAll}
                />
              </div>
              <div className={styles.productColumn}>Product</div>
              <div className={styles.statusColumn}>Status</div>
              <div className={styles.stockColumn}>Stock</div>
              <div className={styles.priceColumn}>Price</div>
              <div className={styles.performanceColumn}>Performance</div>
              <div className={styles.actionsColumn}>Actions</div>
            </div>

            <div className={styles.tableBody}>
              {filteredProducts.map(product => (
                <div key={product.id} className={styles.productRow}>
                  <div className={styles.selectColumn}>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                    />
                  </div>
                  
                  <div className={styles.productColumn}>
                    <div className={styles.productInfo}>
                      <div className={styles.productImage}>
                        <div className={styles.imagePlaceholder}>📦</div>
                      </div>
                      <div className={styles.productDetails}>
                        <h4>{product.name}</h4>
                        <p>{product.category}</p>
                        <span>Added: {product.dateAdded}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.statusColumn}>
                    <select
                      value={product.status}
                      onChange={(e) => handleStatusChange(product.id, e.target.value)}
                      className={styles.statusSelect}
                      style={{ color: getStatusColor(product.status) }}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className={styles.stockColumn}>
                    <span className={product.stock === 0 ? styles.outOfStock : ''}>
                      {product.stock} units
                    </span>
                  </div>

                  <div className={styles.priceColumn}>
                    <div className={styles.pricing}>
                      <span className={styles.currentPrice}>₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className={styles.performanceColumn}>
                    <div className={styles.performance}>
                      <div>👁️ {product.views} views</div>
                      <div>🛒 {product.orders} orders</div>
                      <div>⭐ {product.rating}</div>
                    </div>
                  </div>

                  <div className={styles.actionsColumn}>
                    <div className={styles.actions}>
                      <Link 
                        to={`/marketplace/product/${product.id}/edit`}
                        className={styles.editButton}
                      >
                        Edit
                      </Link>
                      <Link 
                        to={`/marketplace/product/${product.id}`}
                        className={styles.viewButton}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;