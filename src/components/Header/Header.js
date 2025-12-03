import React from 'react';
import './Header.css';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <nav className={`header-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/search" className="nav-link">
            Search
          </a>
          <a href="/sort" className="nav-link">
            Sort
          </a>
        </nav>
        <button
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
