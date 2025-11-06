import { useEffect, useState } from 'react';
import styles from './ScrollIndicator.module.css';

export default function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const scrollableHeight = documentHeight - windowHeight;
      const percentage = scrollableHeight > 0
        ? Math.round((scrollTop / scrollableHeight) * 100)
        : 0;

      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.scrollIndicator}>
      <span className={styles.percentage}>{scrollPercentage}%</span>
    </div>
  );
}
