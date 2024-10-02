import { useState, useEffect, useRef } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { Cover } from "../../components/ui/cover"

export default function Navbar() {
    const Links = [
        { name: 'Home', link: '/' },
        { name: 'CSGPT', link: '/csgpt' },
        { name: 'Get Started', link: '/csgpt' },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [navBackground, setNavBackground] = useState('bg-transparent');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

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

        const checkLoginStatus = () => {
            const token = localStorage.getItem("Token");
            setIsLoggedIn(!!token);
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('storage', checkLoginStatus);

        checkLoginStatus();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const handleLogout = () => {
        setShowModal(true);
    };

    const confirmLogout = () => {
        localStorage.removeItem("Token");
        setIsLoggedIn(false);
        setShowModal(false);
        navigate('/');
    };

    return (
        <>
            <div className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${navBackground}`}>
                <div className="md:px-10 py-4 px-7 flex justify-between items-center">
                    <div>
                        <Link to="/">
                        <Cover>
                                <span className="font-bold text-gray-400">CS</span>
                                <span className="font-bold text-gray-600">GPT</span>
                        </Cover>
                        </Link>
                    </div>
                    <ul className="hidden md:flex md:items-center">
                        {Links.map((link) => (
                            <li key={link.name} className="font-semibold text-gray-400 hover:text-white md:ml-8">
                                <Link to={link.link}>{link.name}</Link>
                            </li>
                        ))}
                        {isLoggedIn ? (
                            <li className="font-semibold text-gray-400 hover:text-white md:ml-8">
                                <button onClick={handleLogout}>SignOut</button>
                            </li>
                        ) : (
                            <li className="font-semibold text-gray-400 hover:text-white md:ml-8">
                                <Link to="/signup">SignIn</Link>
                            </li>
                        )}
                    </ul>

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
                                {isLoggedIn ? (
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            handleLogout();
                                        }}
                                        className="block w-full text-left px-6 py-3 text-sm text-gray-300 hover:bg-black/50 hover:text-white transition-colors duration-200"
                                    >
                                        Sign Out
                                    </button>
                                ) : (
                                    <Link
                                        to="/signup"
                                        className="block px-6 py-3 text-sm text-gray-300 hover:bg-black/50 hover:text-white transition-colors duration-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-80 rounded-lg p-8 max-w-sm w-full">
                        <h2 className="text-2xl text-white font-bold mb-4">Confirm SignOut</h2>
                        <p className="text-white mb-6">Are you sure you want to Sign Out?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                SignOut
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}