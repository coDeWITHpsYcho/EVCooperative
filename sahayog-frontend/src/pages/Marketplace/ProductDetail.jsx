import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ProductDetail.module.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      // Mock API call - replace with actual API
      const mockProduct = {
        id: parseInt(id),
        name: 'Handwoven Silk Saree',
        price: 2500,
        originalPrice: 3000,
        images: [
          '/api/placeholder/600/600',
          '/api/placeholder/600/600',
          '/api/placeholder/600/600',
          '/api/placeholder/600/600'
        ],
        seller: {
          name: 'Priya Textiles',
          location: 'Varanasi, Uttar Pradesh',
          rating: 4.8,
          totalProducts: 156,
          memberSince: '2020'
        },
        rating: 4.8,
        reviews: 124,
        category: 'Textiles & Clothing',
        isNew: false,
        discount: 17,
        inStock: true,
        stockCount: 15,
        description: `This exquisite handwoven silk saree is a masterpiece of traditional Indian craftsmanship. 
        Made by skilled artisans in Varanasi, this saree features intricate designs and premium quality silk 
        that drapes beautifully. Perfect for weddings, festivals, and special occasions.`,
        features: [
          'Premium quality silk material',
          'Handwoven by skilled artisans',
          'Traditional Banarasi design',
          'Comes with matching blouse piece',
          'Care instructions included'
        ],
        specifications: {
          'Material': 'Pure Silk',
          'Length': '6.3 meters',
          'Width': '1.15 meters',
          'Weight': '650 grams',
          'Care': 'Dry clean only',
          'Origin': 'Varanasi, India'
        },
        shippingInfo: {
          deliveryTime: '5-7 business days',
          shippingCost: 'Free shipping on orders above ₹2000',
          returnPolicy: '7 days return policy'
        }
      };
      setProduct(mockProduct);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const mockReviews = [
        {
          id: 1,
          user: 'Anita Sharma',
          rating: 5,
          date: '2024-01-15',
          comment: 'Absolutely beautiful saree! The quality is exceptional and the delivery was quick.',
          helpful: 12
        },
        {
          id: 2,
          user: 'Meera Patel',
          rating: 4,
          date: '2024-01-10',
          comment: 'Good quality silk saree. The colors are vibrant and true to the photos.',
          helpful: 8
        },
        {
          id: 3,
          user: 'Kavya Reddy',
          rating: 5,
          date: '2024-01-05',
          comment: 'Perfect for my wedding! Received many compliments. Highly recommended.',
          helpful: 15
        }
      ];
      setReviews(mockReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log('Added to cart:', { productId: id, quantity });
  };

  const handleBuyNow = () => {
    // Buy now logic
    console.log('Buy now:', { productId: id, quantity });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.error}>
        <h2>Product not found</h2>
        <Link to="/marketplace">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/marketplace">Marketplace</Link>
        <span>›</span>
        <Link to={`/marketplace/category/${product.category}`}>{product.category}</Link>
        <span>›</span>
        <span>{product.name}</span>
      </div>

      <div className={styles.productSection}>
        <div className={styles.imageSection}>
          <div className={styles.mainImage}>
            <div className={styles.imagePlaceholder}>📦</div>
            {product.discount > 0 && (
              <span className={styles.discountBadge}>
                {product.discount}% OFF
              </span>
            )}
          </div>
          <div className={styles.thumbnails}>
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <div className={styles.thumbPlaceholder}>📦</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          
          <div className={styles.rating}>
            <span className={styles.stars}>⭐ {product.rating}</span>
            <span className={styles.reviewCount}>({product.reviews} reviews)</span>
          </div>

          <div className={styles.pricing}>
            <span className={styles.currentPrice}>₹{product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                <span className={styles.savings}>Save ₹{product.originalPrice - product.price}</span>
              </>
            )}
          </div>

          <div className={styles.seller}>
            <h3>Sold by</h3>
            <div className={styles.sellerInfo}>
              <div className={styles.sellerDetails}>
                <h4>{product.seller.name}</h4>
                <p>📍 {product.seller.location}</p>
                <p>⭐ {product.seller.rating} • {product.seller.totalProducts} products</p>
                <p>Member since {product.seller.memberSince}</p>
              </div>
              <Link to={`/seller/${product.seller.name}`} className={styles.viewSellerButton}>
                View Seller
              </Link>
            </div>
          </div>

          <div className={styles.stockInfo}>
            {product.inStock ? (
              <span className={styles.inStock}>✓ In Stock ({product.stockCount} available)</span>
            ) : (
              <span className={styles.outOfStock}>✗ Out of Stock</span>
            )}
          </div>

          <div className={styles.quantitySection}>
            <label>Quantity:</label>
            <div className={styles.quantityControls}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                disabled={quantity >= product.stockCount}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.addToCartButton}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Add to Cart
            </button>
            <button
              className={styles.buyNowButton}
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </button>
          </div>

          <div className={styles.shippingInfo}>
            <h3>Shipping & Returns</h3>
            <ul>
              <li>🚚 {product.shippingInfo.deliveryTime}</li>
              <li>💰 {product.shippingInfo.shippingCost}</li>
              <li>↩️ {product.shippingInfo.returnPolicy}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.detailTabs}>
        <div className={styles.tabHeaders}>
          <button
            className={`${styles.tabHeader} ${activeTab === 'description' ? styles.active : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`${styles.tabHeader} ${activeTab === 'specifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button
            className={`${styles.tabHeader} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviews})
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <div className={styles.description}>
              <p>{product.description}</p>
              <h4>Key Features:</h4>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className={styles.specifications}>
              <table>
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.reviews}>
              {reviews.map(review => (
                <div key={review.id} className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <h4>{review.user}</h4>
                    <div className={styles.reviewRating}>
                      {'⭐'.repeat(review.rating)}
                    </div>
                    <span className={styles.reviewDate}>{review.date}</span>
                  </div>
                  <p>{review.comment}</p>
                  <div className={styles.reviewActions}>
                    <button>👍 Helpful ({review.helpful})</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;