import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

type FilterDropdownProps = {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  label?: string;
};

export default function FilterDropdown({ value, options, onChange, label = 'Filter' }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const displayValue = value || 'All';

  return (
    <div ref={ref} className="inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 flex items-center gap-2 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
      >
        <span className="text-sm">{label}: {displayValue}</span>
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <motion.ul
        initial={{ opacity: 0, y: -6 }}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        style={{ originY: 0 }}
        className={`absolute right-0 mt-2 w-44 rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-40 ${open ? '' : 'pointer-events-none'}`}
        role="listbox"
      >
        <div className="py-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md shadow-lg">
          <li>
            <button
              onClick={() => { onChange(''); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm ${value === '' ? 'font-semibold' : 'font-normal'} text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700`}
            >
              All
            </button>
          </li>
          {options.map(opt => (
            <li key={opt}>
              <button
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm ${opt === value ? 'font-semibold' : 'font-normal'} text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700`}
              >
                {opt}
              </button>
            </li>
          ))}
        </div>
      </motion.ul>
    </div>
  );
}
