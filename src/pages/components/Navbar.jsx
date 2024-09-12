import { useState, useEffect } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { Cover } from "../../components/ui/cover";
export default function Navbar() {
    let Links = [
        { name: 'Home', link: '/' },
        { name: 'CSGPT', link: '/csgpt' },
        { name: 'Pricing', link: '/pricing' },
        { name: 'About', link: '/about' },
    ];

    let [isOpen, setIsOpen] = useState(false);
    let [navBackground, setNavBackground] = useState('bg-transparent');

    // Scroll event listener to change the background color on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavBackground('bg-black/70'); // Translucent black background when scrolling down
            } else {
                setNavBackground('bg-transparent'); // Transparent background when at the top
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${navBackground}`}>
            <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
                {/* logo */}
                <div className="flex text-2xl cursor-pointer items-center gap-2">
                    <Cover><Link to="/"><span className='font-bold text-gray-400'>CS</span><span className='font-bold text-gray-600'>GPT</span></Link></Cover>
                </div>

                {/* Hamburger Icon for mobile */}
                <div onClick={() => setIsOpen(!isOpen)} className="bg-gray-200 p-1 rounded-sm w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden">
                    {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
                </div>

                {/* Links */}
                <ul
                    className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-transparent md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                        isOpen ? 'top-12' : 'top-[-490px]'
                    }`}
                >
                    {Links.map((link) => (
                        <li key={link.name} className="font-semibold text-gray-400 hover:text-white my-7 md:my-0 md:ml-8 ">
                            <Link to={link.link}>{link.name}</Link>
                        </li>
                    ))}
                    <Link to="/csgpt" className="btn bg-stone-600 text-white py-1 px-3 md:ml-8 rounded md:static ">
                        Get Started
                    </Link>
                </ul>
            </div>
        </div>
    );
}
