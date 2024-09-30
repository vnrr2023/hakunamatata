import { useState, useEffect, useRef } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { Cover } from "../../components/ui/cover"
export default function Navbar() {
    const Links = [
        { name: 'Home', link: '/' },
        { name: 'CSGPT', link: '/csgpt' },
        { name: 'Get Started', link: '/csgpt' },
        { name: 'SignIn', link: '/signup' },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [navBackground, setNavBackground] = useState('bg-transparent');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavBackground('bg-black/70');
            } else {
                setNavBackground('bg-transparent');
            }
        };

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${navBackground}`}>
            <div className="md:px-10 py-4 px-7 flex justify-between items-center">
                {/* logo */}
                <div>
          <Cover>
            <Link to="/">
              <span className="font-bold text-gray-400">CS</span>
              <span className="font-bold text-gray-600">GPT</span>
            </Link>
          </Cover>
        </div>
                {/* Desktop Navigation */}
                <ul className="hidden md:flex md:items-center">
                    {Links.map((link) => (
                        <li key={link.name} className="font-semibold text-gray-400 hover:text-white md:ml-8">
                            <Link to={link.link}>{link.name}</Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Navigation */}
                <div className="md:hidden" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-gray-200 p-1 rounded-sm w-7 h-7 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3BottomRightIcon className="w-5 h-5" />}
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-black/70 backdrop-blur-sm rounded-md shadow-lg py-1 z-10 mr-4">
                            {Links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.link}
                                    className="block px-6 py-3 text-sm text-gray-300 hover:bg-black/50 hover:text-white transition-colors duration-200"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}