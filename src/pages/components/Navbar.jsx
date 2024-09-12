import { useState } from 'react' 
import {Bars3BottomRightIcon, XMarkIcon} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';

export default function Navbar() {
    let Links=[
        {name: 'Home',link:'/'},
        {name: 'CSGPT',link:'/csgpt'},
        {name: 'Pricing',link:'/pricing'},
        {name: 'About',link:'/about'},
    ]

    let [isOpen, setIsOpen] = useState(false);
    return (
    <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:px-10 py-4 px-7 md:flex justify-between items-center bg-white">
            {/*logo*/}
            <div className="flex text-2xl cursor-pointer items-center gap-2">
                <span className="font-bold text-blue-300">CSGPT</span>
            </div>

            <div onClick = {() => setIsOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden'>
                {
                    isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />
                }
            </div>

            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto
            z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
                {
                    Links.map(link => (<li key={link.name} className="font-semibold my-7 md:my-0 md:ml-8">
                        <a href={link.link}>{link.name}</a>
                    </li>
                    ))
                }
                <Link to="/csgpt" className="btn bg-blue-600 text-white py-1 px-3 md:ml-8 rounded md:static">
                        Get Started
                    </Link>
            </ul>
        </div>
      
    </div>
  )
}
