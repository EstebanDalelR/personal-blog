import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './SidebarFooter.module.css';

type FontOption = 'default' | 'system' | 'dyslexia';

export default function SidebarFooter() {
  const [font, setFont] = useState<FontOption>('default');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sidebarContainer, setSidebarContainer] = useState<HTMLElement | null>(null);

  // Load font preference from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedFont = localStorage.getItem('font-preference') as FontOption;
    if (savedFont) {
      setFont(savedFont);
      document.documentElement.setAttribute('data-font', savedFont);
    }

    // Find the sidebar container
    const findSidebar = () => {
      // Try to find Nextra's sidebar container
      const sidebar = document.querySelector('aside.nextra-sidebar-container') ||
                      document.querySelector('aside[class*="sidebar"]') ||
                      document.querySelector('nav.nextra-nav-container');

      if (sidebar) {
        setSidebarContainer(sidebar as HTMLElement);
      } else {
        // Retry after a short delay if not found
        setTimeout(findSidebar, 100);
      }
    };

    findSidebar();
  }, []);

  const handleFontChange = (newFont: FontOption) => {
    setFont(newFont);
    localStorage.setItem('font-preference', newFont);
    document.documentElement.setAttribute('data-font', newFont);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Toggle the sidebar visibility on mobile
    const sidebar = document.querySelector('aside.nextra-sidebar-container') ||
                    document.querySelector('aside[class*="sidebar"]');
    if (sidebar) {
      sidebar.classList.toggle('open');
    }
  };

  const fontLabels: Record<FontOption, string> = {
    default: 'Default',
    system: 'System',
    dyslexia: 'Dyslexia',
  };

  const footerContent = (
    <div className={styles.sidebarFooter}>
      {/* Menu Toggle Button */}
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        title="Toggle menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {menuOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
        <span className={styles.buttonLabel}>Menu</span>
      </button>

      {/* Font Switcher Button */}
      <div className={styles.fontSwitcher}>
        <button
          className={styles.fontButton}
          onClick={() => {
            const fonts: FontOption[] = ['default', 'system', 'dyslexia'];
            const currentIndex = fonts.indexOf(font);
            const nextFont = fonts[(currentIndex + 1) % fonts.length];
            handleFontChange(nextFont);
          }}
          aria-label={`Current font: ${fontLabels[font]}. Click to change font`}
          title="Change font"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 7 4 4 20 4 20 7" />
            <line x1="9" y1="20" x2="15" y2="20" />
            <line x1="12" y1="4" x2="12" y2="20" />
          </svg>
          <span className={styles.buttonLabel}>{fontLabels[font]}</span>
        </button>
      </div>
    </div>
  );

  // If we found a sidebar container, portal the footer into it
  // Otherwise, render it with fixed positioning
  if (!mounted) return null;

  if (sidebarContainer) {
    return createPortal(footerContent, sidebarContainer);
  }

  return footerContent;
}
