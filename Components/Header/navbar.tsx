'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/skills', label: 'Skills' },
    ]

    return (
        <header className='w-full sticky top-0 z-50 shadow-md backdrop-blur-sm bg-emerald-100/90 border-b border-emerald-200'>
            <nav className='flex items-center justify-between px-4 sm:px-6 py-3 mx-auto max-w-7xl'>
                <Link href="/" className='flex items-center space-x-3 transition-opacity duration-300 hover:opacity-80'>
                    <img
                        className='rounded-full border-2 border-green-500 object-cover'  
                        src="https://avatars.githubusercontent.com/u/191920224?v=4" 
                        alt="My Github Avatar" 
                        width={40}
                        height={40}
                    />
                    <h2 className='font-extrabold text-lg text-gray-800 hidden sm:block'>EMMANUEL MUNANKA</h2>
                </Link>

                <button 
                    className='sm:hidden p-2 text-gray-700'
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`sm:hidden ${isOpen ? 'flex' : 'hidden'} absolute top-full left-0 right-0 bg-emerald-100/95 backdrop-blur-sm p-4 flex-col space-y-3 shadow-lg`}>
                    {navLinks.map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href}
                            className='text-gray-700 hover:text-emerald-600 font-medium transition-colors block'
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link 
                        href="/contacts"
                        className='bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300 transform hover:scale-105 text-center'
                        onClick={() => setIsOpen(false)}
                    >
                        Contacts
                    </Link>
                </div>

                <div className='hidden sm:flex items-center space-x-4'>
                    {navLinks.map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href}
                            className='text-gray-700 hover:text-emerald-600 font-medium transition-colors'
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link 
                        href="/contacts"
                        className='bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300 transform hover:scale-105'
                    >
                        Contacts
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
