import { useState, useRef, useEffect } from 'react';
import styles from './styles/dropdownMenu.module.scss';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    { id: 'design', name: 'Design', subCategories: ['Logo Design', 'UX/UI Design', 'Web Design'] },
    { id: 'development', name: 'Development', subCategories: ['Web Development', 'Mobile Apps', 'Game Development'] },
    { id: 'writing', name: 'Writing', subCategories: ['Content Writing', 'Copywriting', 'Technical Writing'] },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        Category
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {categories.map((category) => (
            <li key={category.id} className={styles.menuItem}>
              <span className={styles.menuItemText}>{category.name}</span>
              <ul className={styles.subMenu}>
                {category.subCategories.map((subCategory, index) => (
                  <li key={index} className={styles.subMenuItem}>
                    {subCategory}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
