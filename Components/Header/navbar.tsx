'use client';
import React from 'react';
// The useRouter hook is kept for programmatic navigation examples
import { useRouter } from 'next/navigation'; 
// Link is preferred for simple internal navigation
import Link from 'next/link'; 


const Navbar = () => {

    const router = useRouter()

    // Programmatic routing functions (for when navigation logic is required)
    const ToContacts = () => {
        router.push('/contacts')
    }

    const ToSkills = () => {
        router.push('/skills')
    }
    
    // NOTE: For 'Home', we will use the Link component directly for simplicity.
    
    return (
        <header className='w-full sticky top-0 z-50 shadow-md backdrop-blur-sm bg-emerald-100/90 border-b border-emerald-200'>
            <nav className='flex items-center justify-between px-6 py-3 mx-auto'>
                
                {/* Logo and Title Section */}
                <Link href="/" className='flex items-center space-x-3 transition-opacity duration-300 hover:opacity-80'>
                    <img 
                        className='rounded-full border-2 border-green-500 object-cover'  
                        src="https://avatars.githubusercontent.com/u/191920224?v=4" 
                        alt="My Github Avatar" 
                        width={50} // Slightly smaller size for navbar
                        height={50}
                    />
                    <h2 className='font-extrabold text-lg text-gray-800 hidden sm:block'>EMMANUEL MUNANKA</h2>
                </Link>

                {/* Navigation Buttons - Styled to match Hero CTAs */}
                <div className='flex space-x-3 sm:space-x-4'>
                    
                    {/* Primary Action Style (Contacts) - Programmatic Router */}
                    <button  
                        onClick={ToContacts}  
                        className='bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300 transform hover:scale-105'
                    >
                        Contacts
                    </button>

                    {/* Secondary Action Style (Skills) - Programmatic Router */}
                    <button 
                        onClick={ToSkills} 
                        className='border border-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105'
                    >
                        Skills
                    </button>
                    
                    {/* Tertiary Action Style (Home) - Using Link for performance */}
                    <Link href="/">
                        <button 
                            // Note: Link wraps the button, so the styling is applied here
                            className='font-bold text-gray-800 py-2 px-4 rounded-lg hover:text-emerald-600 transition duration-300'
                        >
                            Home
                        </button>
                    </Link>
                </div>
                
            </nav>
        </header>
    );
}

export default Navbar;