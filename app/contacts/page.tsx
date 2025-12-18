"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';


const ContactForm: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!form.current) return;

        setStatus('sending');


        const SERVICE_ID = 'service_uyhbh46';
        const TEMPLATE_ID = 'template_hz36u2j';
        const PUBLIC_KEY = 'Pd6347alfyRYhQSOX';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then(() => {
                setStatus('success');
                if (form.current) form.current.reset();
            }, (error) => {
                console.error(error.text);
                setStatus('error');
            });
    };

    return (
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Send Me a Message</h3>
            
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                    placeholder="Your Name"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                    placeholder="Tell me about your project..."
                />
            </div>
            
            <button 
                type="submit" 
                disabled={status === 'sending'}
                className={`w-full text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-[1.01] 
                    ${status === 'sending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
                <p className="text-emerald-600 font-medium text-center bg-emerald-50 py-2 rounded">Message sent successfully!</p>
            )}
            {status === 'error' && (
                <p className="text-red-600 font-medium text-center bg-red-50 py-2 rounded">Something went wrong. Please try again.</p>
            )}
        </form>
    );
};


interface ContactLinkProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

const ContactLink: React.FC<ContactLinkProps> = ({ icon, label, value, href }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-emerald-500 transition duration-300"
    >
        <div className="text-3xl text-emerald-600 flex-shrink-0">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <h4 className="font-semibold text-gray-900 break-words">{value}</h4>
        </div>
    </a>
);


export default function ContactsPage() {
    return (
        <main className="bg-stone-50 min-h-screen py-20">
            <div className="container mx-auto px-6 lg:px-12">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-2">Let&apos;s Build Something Great</h1>
                    <p className="text-xl text-gray-600">I&apos;m ready to discuss new opportunities or a role on your team.</p>
                    <Link href="/" className="text-lg text-emerald-600 hover:underline mt-4 inline-block font-medium">
                        ← Back to Home Page
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl border-t-4 border-emerald-600">
                        <ContactForm />
                    </div>

                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-gray-800">Direct Contact & Socials</h2>
                        <div className="space-y-4">
                            <ContactLink 
                                icon="📧" 
                                label="Email" 
                                value="emmanuelmunanka38@gmail.com" 
                                href="mailto:emmanuelmunanka38@gmail.com"
                            />
                            <ContactLink 
                                icon="🔗" 
                                label="Instagram" 
                                value="@em_mafx12" 
                                href="https://www.instagram.com/em_mafx12/"
                            />
                            <ContactLink 
                                icon="💾" 
                                label="GitHub" 
                                value="EmmanuelMunanka38" 
                                href="https://github.com/EmmanuelMunanka38"
                            />
                        </div>
                        <div className="text-center md:text-left pt-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Location</h3>
                            <p className="text-lg text-gray-600">Dar es Salaam, Tanzania (EAT)</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}