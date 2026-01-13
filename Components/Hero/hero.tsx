import React from 'react';
import Image from 'next/image';
import { FaReact } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { BiLogoTailwindCss } from "react-icons/bi";
import { FaDocker } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";


const Hero = () => {
    return (
        <section className="min-h-screen flex items-center bg-white  py-20">
  
  <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center border border-transparent rounder in-hover:q">


    <div className="order-2 md:order-1 text-center md:text-left space-y-8 ">
      

      <div className="space-y-2">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Emmanuel Munanka
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-emerald-600">
          CEO & Full-Stack Architect at Cosmic
        </h2>
      </div>


      <div className="text-lg text-gray-700 space-y-4">
        <p>
          My role is rooted in strategic vision and full-cycle product development. As the Founder, I understand the critical intersection of business goals and technical execution, translating ambitious concepts into highly functional, scalable, and user-centric web applications.
        </p>
        <p>
          My technical foundation is in the modern, high-performance web ecosystem. I leverage Next.js and React for superior frontend architecture, paired with robust backend development using Node.js and Express. I drive quality with TypeScript and ensure deployment consistency with Docker and MongoDB.
        </p>
        <p>
          I deliver a unique blend of executive insight and hands-on technical skill, focused maniacally on scalability, maintainability, and world-class performance.
        </p>
      </div>


      <div className="pt-6">
      <div className=''>
        <h2 className='font-bold text-3xl'>THE CORE TECH STACK: </h2>
      </div>
      <div className='flex items-center justify-around text-4xl mt-5'>
          <span className='text-blue-500'> <FaReact/></span>     
          <span className='text-green-500'><FaNodeJs/></span>     
          <span className='text-blue-600'><BiLogoTypescript/></span>     
          <span className='text-blue-600'><BiLogoTailwindCss/></span>     
          <span className='text-blue-700'><FaDocker/></span>     
          <span className='text-green-600'><DiMongodb/></span>
        </div>
      </div>
      

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-8 justify-center md:justify-start">
        <button className="bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg shadow-xl hover:bg-emerald-700 transition duration-300 transform hover:scale-105">
          View Featured Projects
        </button>
        <a href="https://github.com/EmmanuelMunanka38"><button className="border  border-gray-300 text-gray-800 font-bold py-4 px-8 rounded-lg hover:bg-green-200 transition duration-300">
          Connect to my GITHUB
        </button></a>
      </div>
      
    </div>

    <div className="order-1 md:order-2 flex justify-center">
      <img
        className="rounded-full object-cover shadow-2xl border-4 border-emerald-500 w-80 h-80 lg:w-96 lg:h-96 transform hover:scale-105 transition duration-500"
        src="https://avatars.githubusercontent.com/u/191920224?v=4"
        alt="Emmanuel Munanka Professional Headshot"
        width={400}
        height={400}
      />
    </div>

  </div>
</section>
    );
}

export default Hero;


