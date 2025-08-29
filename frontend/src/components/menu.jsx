import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const isPracticeActive = () => {
    return location.pathname === '/quiz' || location.pathname === '/roleplay';
  };

  // Styles
  const navStyle = {
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative'
  };

  const linkStyle = {
    textDecoration: 'none',
    margin: '0 10px',
    padding: '8px 16px',
    borderRadius: '4px',
    color: '#333',
    transition: 'all 0.2s ease'
  };

  const activeLinkStyle = {
    ...linkStyle,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white'
  };

  const dropdownButtonStyle = {
    ...linkStyle,
    background: isPracticeActive() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
    color: isPracticeActive() ? 'white' : '#333',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  const dropdownMenuStyle = {
    position: 'absolute',
    top: '100%',
    left: 0,
    background: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    borderRadius: '8px',
    marginTop: '4px',
    listStyle: 'none',
    padding: '8px 0',
    minWidth: '140px',
    zIndex: 1000,
    opacity: isDropdownOpen ? 1 : 0,
    visibility: isDropdownOpen ? 'visible' : 'hidden',
    transform: isDropdownOpen ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'all 0.2s ease'
  };

  const dropdownItemStyle = {
    display: 'block',
    padding: '10px 16px',
    color: '#333',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    borderRadius: '4px',
    margin: '2px 8px'
  };

  const hamburgerStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '4px',
    transition: 'all 0.2s ease'
  };

  // Hover handlers for desktop links
  const handleLinkHover = (e, isActive) => {
    if (!isActive) {
      e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      e.target.style.color = 'white';
    }
  };

  const handleLinkLeave = (e, isActive) => {
    if (!isActive) {
      e.target.style.background = 'transparent';
      e.target.style.color = '#333';
    }
  };

  // Hover handlers for dropdown items
  const handleDropdownItemHover = (e, isActive) => {
    if (!isActive) {
      e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      e.target.style.color = 'white';
    }
  };

  const handleDropdownItemLeave = (e, isActive) => {
    if (!isActive) {
      e.target.style.background = 'transparent';
      e.target.style.color = '#333';
    }
  };

  // Hover handlers for practice dropdown button
  const handleDropdownButtonHover = (e) => {
    if (!isPracticeActive()) {
      e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      e.target.style.color = 'white';
    }
  };

  const handleDropdownButtonLeave = (e) => {
    if (!isPracticeActive()) {
      e.target.style.background = 'transparent';
      e.target.style.color = '#333';
    }
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
          🇳🇵NepalLearn
        </span>
      </div>

      {!isMobile ? (
        // Desktop Navigation
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to="/flashcard"
            style={isActiveLink('/flashcard') ? activeLinkStyle : linkStyle}
            onMouseEnter={(e) => handleLinkHover(e, isActiveLink('/flashcard'))}
            onMouseLeave={(e) => handleLinkLeave(e, isActiveLink('/flashcard'))}
          >
            Flashcard
          </Link>

          {/* Practice Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              style={dropdownButtonStyle}
              onClick={toggleDropdown}
              onMouseEnter={(e) => {
                setIsDropdownOpen(true);
                handleDropdownButtonHover(e);
              }}
              onMouseLeave={handleDropdownButtonLeave}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Practice
              <span style={{ 
                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                fontSize: '12px'
              }}>
                ▼
              </span>
            </button>

            <ul style={dropdownMenuStyle}>
              <li>
                <Link
                  to="/quiz"
                  style={{
                    ...dropdownItemStyle,
                    background: isActiveLink('/quiz') ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                    color: isActiveLink('/quiz') ? 'white' : '#333'
                  }}
                  onClick={closeDropdown}
                  onMouseEnter={(e) => handleDropdownItemHover(e, isActiveLink('/quiz'))}
                  onMouseLeave={(e) => handleDropdownItemLeave(e, isActiveLink('/quiz'))}
                >
                  📝 Quiz
                </Link>
              </li>
              <li>
                <Link
                  to="/roleplay"
                  style={{
                    ...dropdownItemStyle,
                    background: isActiveLink('/roleplay') ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                    color: isActiveLink('/roleplay') ? 'white' : '#333'
                  }}
                  onClick={closeDropdown}
                  onMouseEnter={(e) => handleDropdownItemHover(e, isActiveLink('/roleplay'))}
                  onMouseLeave={(e) => handleDropdownItemLeave(e, isActiveLink('/roleplay'))}
                >
                  🎭 RolePlay
                </Link>
              </li>
            </ul>
          </div>

          <Link
            to="/favourites"
            style={isActiveLink('/favourites') ? activeLinkStyle : linkStyle}
            onMouseEnter={(e) => handleLinkHover(e, isActiveLink('/favourites'))}
            onMouseLeave={(e) => handleLinkLeave(e, isActiveLink('/favourites'))}
          >
            Favourites
          </Link>
          <Link
            to="/learn"
            style={isActiveLink('/learn') ? activeLinkStyle : linkStyle}
            onMouseEnter={(e) => handleLinkHover(e, isActiveLink('/learn'))}
            onMouseLeave={(e) => handleLinkLeave(e, isActiveLink('/learn'))}
          >
            Learn
          </Link>
        </div>
      ) : (
        // Mobile Hamburger
        <button 
          onClick={toggleMenu} 
          style={{
            ...hamburgerStyle,
            background: isMenuOpen ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
            color: isMenuOpen ? 'white' : '#333'
          }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Mobile Menu */}
      {isMobile && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          padding: '20px',
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? 'visible' : 'hidden',
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
          transition: 'all 0.3s ease',
          borderRadius: '0 0 8px 8px'
        }}>
          <Link 
            to="/flashcard" 
            style={{ 
              display: 'block', 
              padding: '12px 0', 
              textDecoration: 'none', 
              color: isActiveLink('/flashcard') ? 'white' : '#333',
              borderBottom: '1px solid #f0f0f0',
              background: isActiveLink('/flashcard') ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
              borderRadius: '4px',
              paddingLeft: '8px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={(e) => {
              if (!isActiveLink('/flashcard')) {
                e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                e.target.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink('/flashcard')) {
                e.target.style.background = 'transparent';
                e.target.style.color = '#333';
              }
            }}
          >
            Flashcard
          </Link>
          
          {/* Mobile Practice Section */}
          <div style={{ borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ 
              padding: '12px 8px', 
              color: isPracticeActive() ? 'white' : '#333',
              fontWeight: isPracticeActive() ? 'bold' : 'normal',
              background: isPracticeActive() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}>
              Practice
            </div>
            <div style={{ paddingLeft: '16px', paddingBottom: '8px' }}>
              <Link 
                to="/quiz" 
                style={{ 
                  display: 'block', 
                  padding: '8px 0', 
                  textDecoration: 'none', 
                  color: isActiveLink('/quiz') ? 'white' : '#666',
                  fontSize: '14px',
                  background: isActiveLink('/quiz') ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  borderRadius: '4px',
                  paddingLeft: '8px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  if (!isActiveLink('/quiz')) {
                    e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActiveLink('/quiz')) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#666';
                  }
                }}
              >
                📝 Quiz
              </Link>
              <Link 
                to="/roleplay" 
                style={{ 
                  display: 'block', 
                  padding: '8px 0', 
                  textDecoration: 'none', 
                  color: isActiveLink('/roleplay') ? 'white' : '#666',
                  fontSize: '14px',
                  background: isActiveLink('/roleplay') ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  borderRadius: '4px',
                  paddingLeft: '8px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  if (!isActiveLink('/roleplay')) {
                    e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActiveLink('/roleplay')) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#666';
                  }
                }}
              >
                🎭 RolePlay
              </Link>
            </div>
          </div>
          
          <Link 
            to="/favourites" 
            style={{ 
              display: 'block', 
              padding: '12px 0', 
              textDecoration: 'none', 
              color: isActiveLink('/favourites') ? 'white' : '#333',
              borderBottom: '1px solid #f0f0f0',
              background: isActiveLink('/favourites') ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
              borderRadius: '4px',
              paddingLeft: '8px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={(e) => {
              if (!isActiveLink('/favourites')) {
                e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                e.target.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink('/favourites')) {
                e.target.style.background = 'transparent';
                e.target.style.color = '#333';
              }
            }}
          >
            Favourites
          </Link>
          <Link 
            to="/learn" 
            style={{ 
              display: 'block', 
              padding: '12px 0', 
              textDecoration: 'none', 
              color: isActiveLink('/learn') ? 'white' : '#333',
              background: isActiveLink('/learn') ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
              borderRadius: '4px',
              paddingLeft: '8px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={(e) => {
              if (!isActiveLink('/learn')) {
                e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                e.target.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActiveLink('/learn')) {
                e.target.style.background = 'transparent';
                e.target.style.color = '#333';
              }
            }}
          >
            Learn
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Menu;