'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 


const Navbar = () => {

    const router = useRouter()


    const ToContacts = () => {
        router.push('/contacts')
    }

    const ToSkills = () => {
        router.push('/skills')
    }
    

    
    return (
        <header className='w-full sticky top-0 z-50 shadow-md backdrop-blur-sm bg-emerald-100/90 border-b border-emerald-200'>
            <nav className='flex items-center justify-between px-6 py-3 mx-auto'>
                

                <Link href="/" className='flex items-center space-x-3 transition-opacity duration-300 hover:opacity-80'>
                    <img
                        className='rounded-full border-2 border-green-500 object-cover'  
                        src="https://avatars.githubusercontent.com/u/191920224?v=4" 
                        alt="My Github Avatar" 
                        width={50}
                        height={50}
                    />
                    <h2 className='font-extrabold text-lg text-gray-800 hidden sm:block'>EMMANUEL MUNANKA</h2>
                </Link>


                <div className='flex space-x-3 sm:space-x-4'>
                    

                    <button  
                        onClick={ToContacts}  
                        className='bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300 transform hover:scale-105'
                    >
                        Contacts
                    </button>


                    <button 
                        onClick={ToSkills} 
                        className='border border-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105'
                    >
                        Skills
                    </button>
                    


                </div>
                
            </nav>
        </header>
    );
}

export default Navbar;