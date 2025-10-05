// components/Dropdown.js
import { useState, useEffect, useRef } from 'react';

export default function Dropdown({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Fungsi untuk menutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggleDropdown}>
        {trigger}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-vorbase-gray border border-vorbase-gray-light ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
