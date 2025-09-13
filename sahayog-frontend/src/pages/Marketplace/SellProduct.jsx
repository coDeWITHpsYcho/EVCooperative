import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SellProduct.module.css';

const SellProduct = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    productName: '',
    category: '',
    subcategory: '',
    description: '',
    
    // Pricing & Inventory
    price: '',
    originalPrice: '',
    stock: '',
    minOrderQuantity: 1,
    
    // Product Details
    specifications: {},
    features: [''],
    
    // Images
    images: [],
    
    // Shipping & Policies
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    shippingCost: '',
    returnPolicy: '7_days',
    
    // SEO & Marketing
    tags: [],
    metaTitle: '',
    metaDescription: ''
  });

  const categories = [
    {
      name: 'Textiles & Clothing',
      subcategories: ['Sarees', 'Kurtas', 'Shirts', 'Dresses', 'Traditional Wear']
    },
    {
      name: 'Handicrafts',
      subcategories: ['Wood Crafts', 'Metal Crafts', 'Bamboo Products', 'Stone Crafts']
    },
    {
      name: 'Organic Food',
      subcategories: ['Spices', 'Grains', 'Pulses', 'Oil', 'Honey', 'Tea']
    },
    {
      name: 'Jewelry',
      subcategories: ['Silver Jewelry', 'Beaded Jewelry', 'Traditional Jewelry']
    },
    {
      name: 'Home Decor',
      subcategories: ['Wall Hangings', 'Decorative Items', 'Lighting', 'Furniture']
    },
    {
      name: 'Pottery',
      subcategories: ['Dinnerware', 'Decorative Pottery', 'Storage Items']
    }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload these to a server
    console.log('Images to upload:', files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit product data to API
      console.log('Submitting product:', formData);
      // Navigate to success page or product listing
      navigate('/marketplace/my-products');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getSubcategories = () => {
    const category = categories.find(cat => cat.name === formData.category);
    return category ? category.subcategories : [];
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Sell Your Product</h1>
        <p>Share your craftsmanship with the world</p>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressStep}>
          <div className={`${styles.stepCircle} ${currentStep >= 1 ? styles.active : ''}`}>1</div>
          <span>Basic Info</span>
        </div>
        <div className={styles.progressLine}></div>
        <div className={styles.progressStep}>
          <div className={`${styles.stepCircle} ${currentStep >= 2 ? styles.active : ''}`}>2</div>
          <span>Pricing</span>
        </div>
        <div className={styles.progressLine}></div>
        <div className={styles.progressStep}>
          <div className={`${styles.stepCircle} ${currentStep >= 3 ? styles.active : ''}`}>3</div>
          <span>Images</span>
        </div>
        <div className={styles.progressLine}></div>
        <div className={styles.progressStep}>
          <div className={`${styles.stepCircle} ${currentStep >= 4 ? styles.active : ''}`}>4</div>
          <span>Review</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {currentStep === 1 && (
          <div className={styles.step}>
            <h2>Basic Information</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Subcategory</label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  disabled={!formData.category}
                >
                  <option value="">Select subcategory</option>
                  {getSubcategories().map(subcat => (
                    <option key={subcat} value={subcat}>{subcat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Product Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe your product in detail..."
                rows="6"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Key Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className={styles.featureInput}>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className={styles.removeButton}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className={styles.addFeatureButton}
              >
                + Add Feature
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className={styles.step}>
            <h2>Pricing & Inventory</h2>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Selling Price (₹) *</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Original Price (₹)</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Stock Quantity *</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Minimum Order Quantity</label>
                <input
                  type="number"
                  value={formData.minOrderQuantity}
                  onChange={(e) => handleInputChange('minOrderQuantity', e.target.value)}
                  placeholder="1"
                  min="1"
                />
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="0.0"
                  min="0"
                  step="0.1"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Shipping Cost (₹)</label>
                <input
                  type="number"
                  value={formData.shippingCost}
                  onChange={(e) => handleInputChange('shippingCost', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Return Policy</label>
                <select
                  value={formData.returnPolicy}
                  onChange={(e) => handleInputChange('returnPolicy', e.target.value)}
                >
                  <option value="no_returns">No Returns</option>
                  <option value="7_days">7 Days Return</option>
                  <option value="15_days">15 Days Return</option>
                  <option value="30_days">30 Days Return</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className={styles.step}>
            <h2>Product Images</h2>
            
            <div className={styles.imageUpload}>
              <div className={styles.uploadArea}>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles.fileInput}
                />
                <label htmlFor="images" className={styles.uploadLabel}>
                  <div className={styles.uploadIcon}>📷</div>
                  <h3>Upload Product Images</h3>
                  <p>Drop images here or click to browse</p>
                  <small>Maximum 10 images, 5MB each</small>
                </label>
              </div>
            </div>

            <div className={styles.imageGuidelines}>
              <h3>Image Guidelines</h3>
              <ul>
                <li>Use high-quality images (minimum 800x800 pixels)</li>
                <li>Show your product from multiple angles</li>
                <li>Include close-up shots of important details</li>
                <li>Use good lighting and clean backgrounds</li>
                <li>First image will be used as the main product image</li>
              </ul>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className={styles.step}>
            <h2>Review & Submit</h2>
            
            <div className={styles.reviewSection}>
              <div className={styles.reviewCard}>
                <h3>Product Information</h3>
                <div className={styles.reviewItem}>
                  <strong>Name:</strong> {formData.productName}
                </div>
                <div className={styles.reviewItem}>
                  <strong>Category:</strong> {formData.category} {formData.subcategory && `> ${formData.subcategory}`}
                </div>
                <div className={styles.reviewItem}>
                  <strong>Price:</strong> ₹{formData.price}
                  {formData.originalPrice && ` (was ₹${formData.originalPrice})`}
                </div>
                <div className={styles.reviewItem}>
                  <strong>Stock:</strong> {formData.stock} units
                </div>
              </div>

              <div className={styles.reviewCard}>
                <h3>Description</h3>
                <p>{formData.description}</p>
              </div>

              {formData.features.filter(f => f).length > 0 && (
                <div className={styles.reviewCard}>
                  <h3>Features</h3>
                  <ul>
                    {formData.features.filter(f => f).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.terms}>
              <label className={styles.checkbox}>
                <input type="checkbox" required />
                I agree to the <a href="/terms">Terms and Conditions</a> and confirm that all information provided is accurate.
              </label>
            </div>
          </div>
        )}

        <div className={styles.formActions}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className={styles.backButton}
            >
              ← Back
            </button>
          )}
          
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className={styles.nextButton}
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              className={styles.submitButton}
            >
              Submit Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SellProduct;