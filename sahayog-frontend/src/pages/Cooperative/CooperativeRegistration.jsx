import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CooperativeRegistration.module.css';

const CooperativeRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    cooperativeName: '',
    registrationNumber: '',
    establishedYear: '',
    cooperativeType: '',
    
    // Step 2: Location & Contact
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    
    // Step 3: Leadership & Members
    presidentName: '',
    presidentPhone: '',
    presidentEmail: '',
    secretaryName: '',
    secretaryPhone: '',
    secretaryEmail: '',
    totalMembers: '',
    maleMembers: '',
    femaleMembers: '',
    
    // Step 4: Business Details
    primaryProducts: [],
    secondaryProducts: [],
    annualTurnover: '',
    averageIncome: '',
    marketingChannels: [],
    
    // Step 5: Certifications & Documents
    certifications: [],
    gstNumber: '',
    panNumber: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    
    // Step 6: Upload Documents
    documents: {
      cooperativeRegistration: null,
      gstCertificate: null,
      panCard: null,
      bankPassbook: null,
      productCertificates: null
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cooperativeTypes = [
    'Agricultural Cooperative',
    'Handicraft Cooperative',
    'Textile Cooperative',
    'Dairy Cooperative',
    'Fishery Cooperative',
    'Consumer Cooperative',
    'Credit Cooperative',
    'Housing Cooperative'
  ];

  const productCategories = [
    'Textiles & Clothing',
    'Handicrafts & Art',
    'Agricultural Products',
    'Dairy Products',
    'Processed Foods',
    'Organic Products',
    'Traditional Crafts',
    'Pottery & Ceramics',
    'Jewelry & Accessories',
    'Home Decor'
  ];

  const certificationTypes = [
    'Organic Certification',
    'Fair Trade Certification',
    'GI (Geographical Indication)',
    'ISO Certification',
    'FSSAI License',
    'Handloom Mark',
    'India Organic',
    'Export Certification'
  ];

  const marketingChannels = [
    'Local Markets',
    'Online Platforms',
    'Government Schemes',
    'Export Markets',
    'Retail Stores',
    'Direct Sales',
    'Wholesale Markets',
    'Exhibition & Fairs'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [name]: files[0]
        }
      }));
    } else if (type === 'checkbox') {
      const field = name.split('.')[0];
      if (checked) {
        setFormData(prev => ({
          ...prev,
          [field]: [...prev[field], value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [field]: prev[field].filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.cooperativeName) newErrors.cooperativeName = 'Cooperative name is required';
        if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
        if (!formData.establishedYear) newErrors.establishedYear = 'Established year is required';
        if (!formData.cooperativeType) newErrors.cooperativeType = 'Cooperative type is required';
        break;
      case 2:
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.pincode) newErrors.pincode = 'Pincode is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.email) newErrors.email = 'Email is required';
        break;
      case 3:
        if (!formData.presidentName) newErrors.presidentName = 'President name is required';
        if (!formData.presidentPhone) newErrors.presidentPhone = 'President phone is required';
        if (!formData.secretaryName) newErrors.secretaryName = 'Secretary name is required';
        if (!formData.totalMembers) newErrors.totalMembers = 'Total members is required';
        break;
      case 4:
        if (formData.primaryProducts.length === 0) newErrors.primaryProducts = 'Select at least one primary product';
        if (!formData.annualTurnover) newErrors.annualTurnover = 'Annual turnover is required';
        break;
      case 5:
        if (!formData.gstNumber) newErrors.gstNumber = 'GST number is required';
        if (!formData.panNumber) newErrors.panNumber = 'PAN number is required';
        if (!formData.bankName) newErrors.bankName = 'Bank name is required';
        if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
        if (!formData.ifscCode) newErrors.ifscCode = 'IFSC code is required';
        break;
      case 6:
        if (!formData.documents.cooperativeRegistration) newErrors.cooperativeRegistration = 'Registration certificate is required';
        if (!formData.documents.panCard) newErrors.panCard = 'PAN card is required';
        if (!formData.documents.bankPassbook) newErrors.bankPassbook = 'Bank passbook is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(6)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to success page or dashboard
      navigate('/cooperative/registration-success');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h3>Basic Information</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="cooperativeName">Cooperative Name *</label>
                <input
                  type="text"
                  id="cooperativeName"
                  name="cooperativeName"
                  value={formData.cooperativeName}
                  onChange={handleInputChange}
                  className={errors.cooperativeName ? styles.error : ''}
                />
                {errors.cooperativeName && <span className={styles.errorText}>{errors.cooperativeName}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="registrationNumber">Registration Number *</label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className={errors.registrationNumber ? styles.error : ''}
                />
                {errors.registrationNumber && <span className={styles.errorText}>{errors.registrationNumber}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="establishedYear">Established Year *</label>
                <input
                  type="number"
                  id="establishedYear"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleInputChange}
                  min="1900"
                  max="2024"
                  className={errors.establishedYear ? styles.error : ''}
                />
                {errors.establishedYear && <span className={styles.errorText}>{errors.establishedYear}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="cooperativeType">Cooperative Type *</label>
                <select
                  id="cooperativeType"
                  name="cooperativeType"
                  value={formData.cooperativeType}
                  onChange={handleInputChange}
                  className={errors.cooperativeType ? styles.error : ''}
                >
                  <option value="">Select Type</option>
                  {cooperativeTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.cooperativeType && <span className={styles.errorText}>{errors.cooperativeType}</span>}
              </div>
            </div>
          </div>
        );
        case 2:
        return (
          <div className={styles.stepContent}>
            <h3>Location & Contact Information</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="address">Complete Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={errors.address ? styles.error : ''}
                />
                {errors.address && <span className={styles.errorText}>{errors.address}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={errors.city ? styles.error : ''}
                />
                {errors.city && <span className={styles.errorText}>{errors.city}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="state">State *</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={errors.state ? styles.error : ''}
                />
                {errors.state && <span className={styles.errorText}>{errors.state}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="pincode">Pincode *</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  pattern="[0-9]{6}"
                  className={errors.pincode ? styles.error : ''}
                />
                {errors.pincode && <span className={styles.errorText}>{errors.pincode}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? styles.error : ''}
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? styles.error : ''}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="website">Website (Optional)</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.stepContent}>
            <h3>Leadership & Membership</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="presidentName">President Name *</label>
                <input
                  type="text"
                  id="presidentName"
                  name="presidentName"
                  value={formData.presidentName}
                  onChange={handleInputChange}
                  className={errors.presidentName ? styles.error : ''}
                />
                {errors.presidentName && <span className={styles.errorText}>{errors.presidentName}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="presidentPhone">President Phone *</label>
                <input
                  type="tel"
                  id="presidentPhone"
                  name="presidentPhone"
                  value={formData.presidentPhone}
                  onChange={handleInputChange}
                  className={errors.presidentPhone ? styles.error : ''}
                />
                {errors.presidentPhone && <span className={styles.errorText}>{errors.presidentPhone}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="presidentEmail">President Email</label>
                <input
                  type="email"
                  id="presidentEmail"
                  name="presidentEmail"
                  value={formData.presidentEmail}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="secretaryName">Secretary Name *</label>
                <input
                  type="text"
                  id="secretaryName"
                  name="secretaryName"
                  value={formData.secretaryName}
                  onChange={handleInputChange}
                  className={errors.secretaryName ? styles.error : ''}
                />
                {errors.secretaryName && <span className={styles.errorText}>{errors.secretaryName}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="secretaryPhone">Secretary Phone</label>
                <input
                  type="tel"
                  id="secretaryPhone"
                  name="secretaryPhone"
                  value={formData.secretaryPhone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="secretaryEmail">Secretary Email</label>
                <input
                  type="email"
                  id="secretaryEmail"
                  name="secretaryEmail"
                  value={formData.secretaryEmail}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="totalMembers">Total Members *</label>
                <input
                  type="number"
                  id="totalMembers"
                  name="totalMembers"
                  value={formData.totalMembers}
                  onChange={handleInputChange}
                  min="1"
                  className={errors.totalMembers ? styles.error : ''}
                />
                {errors.totalMembers && <span className={styles.errorText}>{errors.totalMembers}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="maleMembers">Male Members</label>
                <input
                  type="number"
                  id="maleMembers"
                  name="maleMembers"
                  value={formData.maleMembers}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="femaleMembers">Female Members</label>
                <input
                  type="number"
                  id="femaleMembers"
                  name="femaleMembers"
                  value={formData.femaleMembers}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className={styles.stepContent}>
            <h3>Business Details</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Primary Products/Services *</label>
                <div className={styles.checkboxGrid}>
                  {productCategories.map(category => (
                    <label key={category} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="primaryProducts"
                        value={category}
                        checked={formData.primaryProducts.includes(category)}
                        onChange={handleInputChange}
                      />
                      {category}
                    </label>
                  ))}
                </div>
                {errors.primaryProducts && <span className={styles.errorText}>{errors.primaryProducts}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label>Secondary Products/Services</label>
                <div className={styles.checkboxGrid}>
                  {productCategories.map(category => (
                    <label key={category} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="secondaryProducts"
                        value={category}
                        checked={formData.secondaryProducts.includes(category)}
                        onChange={handleInputChange}
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="annualTurnover">Annual Turnover (₹) *</label>
                <select
                  id="annualTurnover"
                  name="annualTurnover"
                  value={formData.annualTurnover}
                  onChange={handleInputChange}
                  className={errors.annualTurnover ? styles.error : ''}
                >
                  <option value="">Select Range</option>
                  <option value="below-1-lakh">Below ₹1 Lakh</option>
                  <option value="1-5-lakh">₹1 - ₹5 Lakh</option>
                  <option value="5-10-lakh">₹5 - ₹10 Lakh</option>
                  <option value="10-25-lakh">₹10 - ₹25 Lakh</option>
                  <option value="25-50-lakh">₹25 - ₹50 Lakh</option>
                  <option value="50-1-crore">₹50 Lakh - ₹1 Crore</option>
                  <option value="above-1-crore">Above ₹1 Crore</option>
                </select>
                {errors.annualTurnover && <span className={styles.errorText}>{errors.annualTurnover}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="averageIncome">Average Member Monthly Income (₹)</label>
                <select
                  id="averageIncome"
                  name="averageIncome"
                  value={formData.averageIncome}
                  onChange={handleInputChange}
                >
                  <option value="">Select Range</option>
                  <option value="below-5000">Below ₹5,000</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000-20000">₹10,000 - ₹20,000</option>
                  <option value="20000-30000">₹20,000 - ₹30,000</option>
                  <option value="above-30000">Above ₹30,000</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Current Marketing Channels</label>
                <div className={styles.checkboxGrid}>
                  {marketingChannels.map(channel => (
                    <label key={channel} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="marketingChannels"
                        value={channel}
                        checked={formData.marketingChannels.includes(channel)}
                        onChange={handleInputChange}
                      />
                      {channel}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className={styles.stepContent}>
            <h3>Certifications & Financial Details</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Certifications & Licenses</label>
                <div className={styles.checkboxGrid}>
                  {certificationTypes.map(cert => (
                    <label key={cert} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        name="certifications"
                        value={cert}
                        checked={formData.certifications.includes(cert)}
                        onChange={handleInputChange}
                      />
                      {cert}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="gstNumber">GST Number *</label>
                <input
                  type="text"
                  id="gstNumber"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                  className={errors.gstNumber ? styles.error : ''}
                />
                {errors.gstNumber && <span className={styles.errorText}>{errors.gstNumber}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="panNumber">PAN Number *</label>
                <input
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  className={errors.panNumber ? styles.error : ''}
                />
                {errors.panNumber && <span className={styles.errorText}>{errors.panNumber}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="bankName">Bank Name *</label>
                <input
                  type="text"
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className={errors.bankName ? styles.error : ''}
                />
                {errors.bankName && <span className={styles.errorText}>{errors.bankName}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="accountNumber">Account Number *</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className={errors.accountNumber ? styles.error : ''}
                />
                {errors.accountNumber && <span className={styles.errorText}>{errors.accountNumber}</span>}
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="ifscCode">IFSC Code *</label>
                <input
                  type="text"
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  pattern="[A-Z]{4}0[A-Z0-9]{6}"
                  className={errors.ifscCode ? styles.error : ''}
                />
                {errors.ifscCode && <span className={styles.errorText}>{errors.ifscCode}</span>}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className={styles.stepContent}>
            <h3>Document Upload</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="cooperativeRegistration">Cooperative Registration Certificate *</label>
                <input
                  type="file"
                  id="cooperativeRegistration"
                  name="cooperativeRegistration"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className={errors.cooperativeRegistration ? styles.error : ''}
                />
                {errors.cooperativeRegistration && <span className={styles.errorText}>{errors.cooperativeRegistration}</span>}
                <small>Upload PDF, JPG, or PNG (Max 5MB)</small>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="gstCertificate">GST Certificate</label>
                <input
                  type="file"
                  id="gstCertificate"
                  name="gstCertificate"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <small>Upload PDF, JPG, or PNG (Max 5MB)</small>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="panCard">PAN Card *</label>
                <input
                  type="file"
                  id="panCard"
                  name="panCard"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className={errors.panCard ? styles.error : ''}
                />
                {errors.panCard && <span className={styles.errorText}>{errors.panCard}</span>}
                <small>Upload PDF, JPG, or PNG (Max 5MB)</small>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="bankPassbook">Bank Passbook/Statement *</label>
                <input
                  type="file"
                  id="bankPassbook"
                  name="bankPassbook"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className={errors.bankPassbook ? styles.error : ''}
                />
                {errors.bankPassbook && <span className={styles.errorText}>{errors.bankPassbook}</span>}
                <small>Upload PDF, JPG, or PNG (Max 5MB)</small>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="productCertificates">Product Certificates (Optional)</label>
                <input
                  type="file"
                  id="productCertificates"
                  name="productCertificates"
                  onChange={handleInputChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                />
                <small>Upload multiple files if needed (Max 5MB each)</small>
              </div>
            </div>
            
            <div className={styles.declaration}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  required
                />
                I hereby declare that all the information provided is true and accurate to the best of my knowledge. I understand that any false information may lead to rejection of the application.
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Cooperative Registration</h1>
        <p>Join our platform and connect with customers across India</p>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        {[1, 2, 3, 4, 5, 6].map(step => (
          <div
            key={step}
            className={`${styles.progressStep} ${
              step <= currentStep ? styles.active : ''
            } ${step < currentStep ? styles.completed : ''}`}
          >
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className={styles.stepLabels}>
        <span>Basic Info</span>
        <span>Contact</span>
        <span>Leadership</span>
        <span>Business</span>
        <span>Financial</span>
        <span>Documents</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {renderStep()}

        <div className={styles.formActions}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className={styles.prevButton}
            >
              Previous
            </button>
          )}
          
          {currentStep < 6 ? (
            <button
              type="button"
              onClick={nextStep}
              className={styles.nextButton}
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CooperativeRegistration;

     