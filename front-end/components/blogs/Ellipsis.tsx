import React, { useState, useRef, useEffect } from "react";

interface EllipsisMenuProps {
  onDelete: () => void;
  onEdit: () => void;
}

const EllipsisMenu: React.FC<EllipsisMenuProps> = ({ onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="absolute inline-block right-[15%] mr-2">
      <div>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          onClick={handleToggle}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
              role="menuitem"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
              role="menuitem"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EllipsisMenu;
