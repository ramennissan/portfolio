import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'lastVisitedBlogPage';

export default function Header() {
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [lastVisitedBlogPage, setLastVisitedBlogPage] = useState<'/blog' | '/bookshelf'>('/blog');
  const dropdownRef = useRef<HTMLLIElement>(null);
  const location = useLocation();

  // Track last visited blog page
  useEffect(() => {
    if (location.pathname === '/blog' || location.pathname === '/bookshelf') {
      const page = location.pathname as '/blog' | '/bookshelf';
      setLastVisitedBlogPage(page);
      localStorage.setItem(STORAGE_KEY, page);
    } else {
      // Load from localStorage on mount or when on other pages
      const stored = localStorage.getItem(STORAGE_KEY) as '/blog' | '/bookshelf' | null;
      if (stored && (stored === '/blog' || stored === '/bookshelf')) {
        setLastVisitedBlogPage(stored);
      }
    }
  }, [location.pathname]);

  // Get the current blog page label and path
  const getCurrentBlogPage = () => {
    if (location.pathname === '/blog') {
      return { path: '/blog', label: 'Blog' };
    }
    if (location.pathname === '/bookshelf') {
      return { path: '/bookshelf', label: 'Bookshelf' };
    }
    // On other pages, show the last visited blog page
    return {
      path: lastVisitedBlogPage,
      label: lastVisitedBlogPage === '/blog' ? 'Blog' : 'Bookshelf'
    };
  };

  const currentBlogPage = getCurrentBlogPage();

  // Determine which dropdown items to show (only items NOT currently displayed)
  const getDropdownItems = () => {
    const items = [];
    const currentPath = location.pathname === '/blog' || location.pathname === '/bookshelf' 
      ? location.pathname 
      : lastVisitedBlogPage;
    
    if (currentPath !== '/blog') {
      items.push({ path: '/blog', label: 'Blog' });
    }
    if (currentPath !== '/bookshelf') {
      items.push({ path: '/bookshelf', label: 'Bookshelf' });
    }
    return items;
  };

  const dropdownItems = getDropdownItems();
  const hasDropdownItems = dropdownItems.length > 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBlogDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsBlogDropdownOpen(false);
  }, [location.pathname]);

  // Check if a route is active
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <header className="flex justify-between items-center p-4 px-8 bg-gray-100 dark:bg-[#2a2a28] text-gray-900 dark:text-white transition-colors duration-300">
      <nav>
        <ul className="flex gap-6 list-none items-center">
          <li>
            <Link 
              to="/" 
              className="no-underline font-medium relative transition-colors hover:text-[#0073d5]"
            >
              About
              {isActiveRoute('/') && (
                <motion.div
                  layoutId="activeIndicator-about"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </li>
          <li>
            <Link 
              to="/projects" 
              className="no-underline font-medium relative transition-colors hover:text-[#0073d5]"
            >
              Projects
              {isActiveRoute('/projects') && (
                <motion.div
                  layoutId="activeIndicator-projects"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </li>
          <li className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-1">
              <Link 
                to={currentBlogPage.path} 
                className="no-underline font-medium relative transition-colors hover:text-[#0073d5]"
              >
                {currentBlogPage.label}
                {(isActiveRoute('/blog') || isActiveRoute('/bookshelf')) && (
                  <motion.div
                    layoutId="activeBlogIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
              {hasDropdownItems && (
                <button
                  onClick={() => setIsBlogDropdownOpen(!isBlogDropdownOpen)}
                  className="bg-transparent border-none cursor-pointer text-inherit flex items-center"
                  aria-label="Toggle blog dropdown"
                >
                  <motion.span
                    animate={{ rotate: isBlogDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.span>
                </button>
              )}
            </div>
            <AnimatePresence>
              {isBlogDropdownOpen && hasDropdownItems && (
                <motion.ul
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-full left-0 mt-1 bg-gray-100 dark:bg-[#2a2a28] border border-gray-300 dark:border-gray-700 rounded shadow-lg min-w-[150px] py-1 z-50"
                >
                  {dropdownItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="block px-4 py-2 no-underline font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </nav>
    </header>
  );
}
