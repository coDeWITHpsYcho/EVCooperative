import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.footerSection}>
            <div className={styles.logo}>
              <span className={styles.logoText}>सहयोग</span>
              <span className={styles.logoSubtext}>Sahayog</span>
            </div>
            <p className={styles.description}>
              Empowering rural communities through digital cooperation. 
              Connecting artisans, drivers, and entrepreneurs for a better tomorrow.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <Facebook size={20} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Twitter size={20} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Instagram size={20} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Services</h3>
            <ul className={styles.linkList}>
              <li><Link to="/transport" className={styles.footerLink}>EV Transport</Link></li>
              <li><Link to="/marketplace" className={styles.footerLink}>Vehicle Marketplace</Link></li>
              <li><Link to="/cooperative" className={styles.footerLink}>Rural Cooperative</Link></li>
              <li><Link to="/cooperative/products" className={styles.footerLink}>Handicrafts</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Support</h3>
            <ul className={styles.linkList}>
              <li><Link to="/help" className={styles.footerLink}>Help Center</Link></li>
              <li><Link to="/contact" className={styles.footerLink}>Contact Us</Link></li>
              <li><Link to="/faq" className={styles.footerLink}>FAQ</Link></li>
              <li><Link to="/terms" className={styles.footerLink}>Terms of Service</Link></li>
              <li><Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Contact Info</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>support@sahayog.in</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>IIT Mumbai, Powai, Mumbai - 400076</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; 2024 Sahayog. All rights reserved. | A project by IIT Mumbai & IIT Patna</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;