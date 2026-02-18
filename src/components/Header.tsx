import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SocialLinks from './SocialLinks';
import ThemeToggle from './ThemeToggle';

const STORAGE_KEY = 'lastVisitedNavPage';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastVisitedNavPage, setLastVisitedNavPage] = useState<'/projects' | '/blog' | '/bookshelf'>('/projects');
  const [headerMode, setHeaderMode] = useState<'top' | 'sidebar'>('top');
  const [canUseSidebar, setCanUseSidebar] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState<number | null>(null);
  const [sidebarLeft, setSidebarLeft] = useState<number | null>(null);
  const [constrainedSidebarWidth, setConstrainedSidebarWidth] = useState<number | null>(null);
  const location = useLocation();

  // Detect screen size to determine if sidebar mode is available
  useEffect(() => {
    const handleResize = () => {
      // Sidebar requires at least 1024px width to avoid obstructing content
      setCanUseSidebar(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect when header should transform to sidebar (only if screen is large enough)
  useEffect(() => {
    const scrollContainer = document.querySelector('.app-scroll') as HTMLElement | null;

    const handleScroll = () => {
      // Find the first main content element (anything with main tag or common content classes)
      const firstContent = document.querySelector('main > *:first-child, .content-section:first-child, [data-first-content]');

      let shouldBeScrolled = false;
      if (firstContent) {
        const rect = firstContent.getBoundingClientRect();
        // Transform to sidebar when the first content reaches the header position (around 80px from top)
        shouldBeScrolled = rect.top <= 80;
      } else {
        // Fallback: use scroll position if no content element found
        const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
        shouldBeScrolled = scrollTop > 100;
      }

      setIsScrolled(shouldBeScrolled);

      // Only use sidebar mode if screen is large enough & scrolled
      if (canUseSidebar) {
        setHeaderMode(shouldBeScrolled ? 'sidebar' : 'top');
      } else {
        // On smaller screens, always stay at top
        setHeaderMode('top');
      }
    };

    // Attach scroll listener to the scroll container when present, otherwise fall back to window
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    handleScroll(); // Check initial state

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [location.pathname, canUseSidebar]); // Re-run when route changes or screen size changes

  // Track last visited nav page within the group
  useEffect(() => {
    const navRoutes = ['/projects', '/blog', '/bookshelf'];
    if (navRoutes.includes(location.pathname)) {
      const page = location.pathname as '/projects' | '/blog' | '/bookshelf';
      setLastVisitedNavPage(page);
      localStorage.setItem(STORAGE_KEY, page);
    } else {
      // Load from localStorage on mount or when on other pages
      const stored = localStorage.getItem(STORAGE_KEY) as '/projects' | '/blog' | '/bookshelf' | null;
      if (stored && navRoutes.includes(stored)) {
        setLastVisitedNavPage(stored);
      }
    }
  }, [location.pathname]);

  // Get the current nav group page label and path
  const getCurrentNavPage = () => {
    if (location.pathname === '/projects') {
      return { path: '/projects', label: 'Projects' };
    }
    if (location.pathname === '/blog') {
      return { path: '/blog', label: 'Blog' };
    }
    if (location.pathname === '/bookshelf') {
      return { path: '/bookshelf', label: 'Bookshelf' };
    }
    // On other pages (like About), show the last visited page from this group
    return {
      path: lastVisitedNavPage,
      label: lastVisitedNavPage === '/projects' ? 'Projects' : (lastVisitedNavPage === '/blog' ? 'Blog' : 'Bookshelf')
    };
  };

  const currentNavPage = getCurrentNavPage();

  // Determine which dropdown items to show (only items NOT currently displayed as the main button)
  const getDropdownItems = () => {
    const currentPath = ['/projects', '/blog', '/bookshelf'].includes(location.pathname)
      ? location.pathname
      : lastVisitedNavPage;

    const allItems = [
      { path: '/projects', label: 'Projects' },
      { path: '/blog', label: 'Blog' },
      { path: '/bookshelf', label: 'Bookshelf' }
    ];

    return allItems.filter(item => item.path !== currentPath);
  };

  const dropdownItems = getDropdownItems();
  const hasDropdownItems = dropdownItems.length > 0;

  // Compute sidebar width to fit nav text when header becomes sidebar
  const computeSidebarWidth = () => {
    if (!navListRef.current) return null;
    const el = navListRef.current;
    let maxW = 0;

    // Use intrinsic scrollWidth so measurement isn't affected by current header width
    const items = el.querySelectorAll('li, a, button');
    items.forEach((it) => {
      const sw = (it as HTMLElement).scrollWidth || (it as HTMLElement).getBoundingClientRect().width;
      if (sw > maxW) maxW = sw;
    });

    // Also include sidebar extras (social + theme) when present
    const extras = document.querySelector('.sidebar-extras') as HTMLElement | null;
    if (extras) {
      const sw = extras.scrollWidth || extras.getBoundingClientRect().width;
      if (sw > maxW) maxW = sw;
    }

    const padding = 36; // breathing room for padding and borders
    const minWidth = 120; // minimal sensible width for autosize
    const w = Math.max(minWidth, Math.ceil(maxW + padding));
    return w;
  };

  useLayoutEffect(() => {
    const measureAndConstrain = () => {
      if (headerMode === 'sidebar') {
        const w = computeSidebarWidth();
        if (w) setSidebarWidth(w);

        // Find centered content container (max-w-3xl) and place sidebar flush with its left edge
        const contentEl = document.querySelector('.max-w-3xl') as HTMLElement | null;
        if (contentEl) {
          const rect = contentEl.getBoundingClientRect();
          const left = Math.max(8, Math.floor(rect.left + 8));
          setSidebarLeft(left);

          // ensure sidebar doesn't overflow the content column
          const maxAllowed = Math.max(240, Math.floor(rect.width - 32));
          const final = Math.min(maxAllowed, w || maxAllowed);
          setConstrainedSidebarWidth(final);
        } else {
          setSidebarLeft(16);
          setConstrainedSidebarWidth(w || 480);
        }

        // re-measure after layout/animation settles (covers timing edge-cases)
        requestAnimationFrame(() => {
          const w2 = computeSidebarWidth();
          if (w2 && w2 !== w) setSidebarWidth(w2);
          setTimeout(() => {
            const w3 = computeSidebarWidth();
            if (w3 && w3 !== (w2 || w)) setSidebarWidth(w3);
            // refresh constrained width/left after small delay
            const contentEl2 = document.querySelector('.max-w-3xl') as HTMLElement | null;
            if (contentEl2) {
              const rect2 = contentEl2.getBoundingClientRect();
              setSidebarLeft(Math.max(8, Math.floor(rect2.left + 8)));
              setConstrainedSidebarWidth(Math.min(Math.max(240, Math.floor(rect2.width - 32)), w3 || w2 || (w || 480)));
            }
          }, 120);
        });
      } else {
        setSidebarWidth(null);
        setSidebarLeft(null);
        setConstrainedSidebarWidth(null);
      }
    };

    measureAndConstrain();
  }, [headerMode, location.pathname]);

  useEffect(() => {
    const onResize = () => {
      if (headerMode === 'sidebar') {
        const w = computeSidebarWidth();
        if (w) setSidebarWidth(w);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [headerMode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Check if a route is active
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  // Calculate opacity based on mode and interaction
  const getHeaderOpacity = () => {
    // In sidebar mode, always full opacity
    if (headerMode === 'sidebar') return 1;

    // In top mode on small screens with scrolled content
    if (!canUseSidebar && isScrolled) {
      // Transparent when not interacting, opaque when interacting
      return isInteracting ? 0.95 : 0.35;
    }

    // Default full opacity
    return 1;
  };

    return (
    <motion.header
      ref={(el) => { headerRef.current = el; }}
    style={headerMode === 'sidebar' && (constrainedSidebarWidth || sidebarWidth) ? { width: `${constrainedSidebarWidth || sidebarWidth}px`, minWidth: '140px' } : undefined}
      animate={{
        top: headerMode === 'top' ? '1rem' : '50%',
        left: headerMode === 'top' ? '50%' : '1rem',
        translateX: headerMode === 'top' ? '-50%' : '0%',
        translateY: headerMode === 'top' ? '0%' : '-50%',
        width: headerMode === 'top' ? 'calc(100% - 2rem)' : (constrainedSidebarWidth ? `${constrainedSidebarWidth}px` : (sidebarWidth ? `${sidebarWidth}px` : 'auto')),
        maxWidth: headerMode === 'top' ? '48rem' : 'none',
        height: headerMode === 'top' ? '3rem' : 'auto',
        flexDirection: headerMode === 'top' ? 'row' : 'column',
        paddingLeft: headerMode === 'top' ? '1.5rem' : '1.5rem',
        paddingRight: headerMode === 'top' ? '1.5rem' : '1.5rem',
        paddingTop: headerMode === 'top' ? '0' : '1.5rem',
        paddingBottom: headerMode === 'top' ? '0' : '1.5rem',
        borderRadius: headerMode === 'top' ? '9999px' : '1rem',
        opacity: getHeaderOpacity(),
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
        opacity: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => {
        // Delay hiding on mobile to allow for interaction
        setTimeout(() => setIsInteracting(false), 2000);
      }}
      onClick={() => {
        // On click/tap, keep visible for a bit
        setIsInteracting(true);
        setTimeout(() => setIsInteracting(false), 3000);
      }}
      className={`fixed z-50 flex justify-between items-center bg-gray-100/80 dark:bg-[#2a2a28]/80 backdrop-blur-md text-gray-900 dark:text-white transition-colors duration-300 border border-gray-200 dark:border-gray-800 shadow-sm ${headerMode === 'sidebar' ? 'min-w-[120px]' : 'w-full'}`}
    >
      <nav ref={(el) => { /* keep for potential future use */ }} className={headerMode === 'top' ? 'h-full flex items-center' : 'flex items-center w-full'}>
        <ul ref={navListRef} className={`flex ${headerMode === 'top' ? 'gap-6' : 'gap-2 flex-col'} list-none items-center ${headerMode === 'top' ? 'h-full' : 'w-full'}`}>
          <li className={headerMode === 'top' ? 'h-full flex items-center' : 'flex items-center w-full justify-center flex-shrink-0'}>
            <Link
              to="/"
              className="no-underline font-medium relative transition-colors hover:text-[#0073d5] py-1 whitespace-nowrap"
            >
              About
              {isActiveRoute('/') && (
                <motion.div
                  layoutId="activeIndicator-about"
                  className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-current"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ originX: 0.5 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          </li>
          <li className={`relative ${headerMode === 'top' ? 'h-full flex items-center' : 'flex items-center w-full justify-center flex-shrink-0'}`} ref={dropdownRef}>
            <div className={`flex items-center gap-1 ${headerMode === 'top' ? 'h-full' : ''}`}>
              <Link
                to={currentNavPage.path}
                className="no-underline font-medium relative transition-colors hover:text-[#0073d5] py-1 whitespace-nowrap"
              >
                {currentNavPage.label}
                {(location.pathname === '/projects' || location.pathname === '/blog' || location.pathname === '/bookshelf') && (
                  <motion.div
                    layoutId="activeNavGroupIndicator"
                    className="absolute bottom-0.5 left-0 right-0 h-0.5 bg-current"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ originX: 0.5 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
              {hasDropdownItems && (
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-transparent border-none cursor-pointer text-inherit flex items-center hover:text-[#0073d5] transition-colors"
                  aria-label="Toggle navigation dropdown"
                >
                  <motion.span
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.span>
                </button>
              )}
            </div>
            <AnimatePresence>
              {isDropdownOpen && hasDropdownItems && (
                <motion.ul
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-full left-0 mt-2 bg-gray-100 dark:bg-[#2a2a28] border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg min-w-[150px] py-1 z-50"
                >
                  {dropdownItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="block px-4 py-2 no-underline font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
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
      <div className={`flex items-center ${headerMode === 'top' ? 'gap-3 h-full flex-row' : 'gap-6 flex-col w-full mt-4'}`}>
        {headerMode === 'sidebar' ? (
            <div className="flex items-center gap-3 px-3 sidebar-extras">
            <SocialLinks sizeClass={headerMode === 'sidebar' ? 'text-xl' : 'text-lg'} />
            <ThemeToggle sizeClass={headerMode === 'sidebar' ? 'text-xl' : 'text-lg'} />
          </div>
        ) : (
          <>
            <SocialLinks />
            <div className={headerMode === 'top' ? 'h-4 w-px bg-gray-300 dark:bg-gray-700' : 'w-full h-px bg-gray-300 dark:bg-gray-700'} />
            <ThemeToggle />
          </>
        )}
      </div>
    </motion.header>
  );
}
