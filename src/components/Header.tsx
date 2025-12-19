import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 px-8 bg-gray-100 dark:bg-[#2a2a28] text-gray-900 dark:text-white transition-colors duration-300">
      <nav>
        <ul className="flex gap-6 list-none">
          <li><Link to="/" className="no-underline font-medium hover:underline">Home</Link></li>
          <li><Link to="/about" className="no-underline font-medium hover:underline">About</Link></li>
          <li><Link to="/projects" className="no-underline font-medium hover:underline">Projects</Link></li>
          <li><Link to="/contact" className="no-underline font-medium hover:underline">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
