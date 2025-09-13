import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, Car, ShoppingBag, Users } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoText}>सहयोग</span>
          <span className={styles.logoSubtext}>Sahayog</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <div className={styles.navLinks}>
            <Link to="/transport" className={styles.navLink}>
              <Car size={20} />
              Transport
            </Link>
            <Link to="/marketplace" className={styles.navLink}>
              <ShoppingBag size={20} />
              Marketplace
            </Link>
            <Link to="/cooperative" className={styles.navLink}>
              <Users size={20} />
              Cooperative
            </Link>
          </div>

          <div className={styles.authSection}>
            {user ? (
              <div className={styles.userMenu}>
                <button
                  className={styles.userButton}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User size={20} />
                  {user.user?.first_name || user.user?.username}
                </button>
                {isUserMenuOpen && (
                  <div className={styles.userDropdown}>
                    <Link to="/dashboard" className={styles.dropdownItem}>
                      <User size={16} />
                      Dashboard
                    </Link>
                    <button onClick={handleLogout} className={styles.dropdownItem}>
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link to="/login" className={`${styles.btn} ${styles.btnSecondary}`}>
                  Login
                </Link>
                <Link to="/register" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuButton} onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={styles.mobileNav}>
            <Link to="/transport" className={styles.mobileNavLink} onClick={toggleMenu}>
              <Car size={20} />
              Transport
            </Link>
            <Link to="/marketplace" className={styles.mobileNavLink} onClick={toggleMenu}>
              <ShoppingBag size={20} />
              Marketplace
            </Link>
            <Link to="/cooperative" className={styles.mobileNavLink} onClick={toggleMenu}>
              <Users size={20} />
              Cooperative
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className={styles.mobileNavLink} onClick={toggleMenu}>
                  <User size={20} />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className={styles.mobileNavLink}>
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.mobileNavLink} onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/register" className={styles.mobileNavLink} onClick={toggleMenu}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;