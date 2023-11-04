'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { DotsThreeOutline } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';

interface PostDropDownProps {
  variant: 'dark' | 'white';
  className?: string;
  children: React.ReactNode;
}

interface ItemProps {
  icon: React.ReactNode;
  title: string;
  className?: string;
}

// Child component
export const ItemComponent = (childProps: ItemProps) => {
  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 50 },
  };
  return (
    <motion.div
      variants={item}
      className={
        'flex items-center gap-3 text-sm hover:bg-gray-200 px-4 py-2 rounded'
      }
    >
      {childProps.icon}
      {childProps.title}
    </motion.div>
  );
};

const PostDropdown = (props: PostDropDownProps) => {
  // Animation
  const list = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: 'afterChildren',
      },
    },
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef(null);
  const handleDropdownClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const handleClickOutside = (e: MouseEvent) => {
    // @ts-ignore
    if (dropdownRef.current && !dropdownRef.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence initial={false} mode="wait">
      <div
        className="cursor-pointer relative py-2"
        onClick={handleDropdownClick}
        ref={dropdownRef}
      >
        <DotsThreeOutline size="24" color={props.variant} weight="fill" />
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={list}
            className={
              'absolute z-10 top-full right-0 rounded duration-600 ease-in-out bg-white shadow-lg border-[1px] border-gray-100'
            }
          >
            {props.children}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default PostDropdown;
