import React from 'react';
import Link from 'next/link';

// NOTE: Since the SkillsPage component is large, we'll assume the internal
// SkillItem component is either defined here or imported from a helper file.

// Reusable component for displaying an individual skill item
const SkillItem = ({ icon, name, description }) => (
    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition duration-300 border border-gray-100">
        <span className="text-2xl text-emerald-600 flex-shrink-0">{icon}</span>
        <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);


const SkillsPage = () => {
    return (

        <main className="bg-stone-50 min-h-screen py-20">
            <div className="container mx-auto px-6 lg:px-12">

                <header className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-2">My Technical Arsenal</h1>
                    <p className="text-xl text-gray-600">The core technologies and strategic mastery that drive Cosmic's development.</p>
                    <Link href="/" className="text-lg text-emerald-600 hover:underline mt-4 inline-block font-medium">
                        ← Back to Home Page
                    </Link>
                </header>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
                    

                    <div className="md:col-span-1 space-y-8 sticky top-20 p-6 bg-white rounded-xl shadow-xl border-t-4 border-emerald-600">
                        <h2 className="text-2xl font-bold text-gray-800">The Architect's Toolkit</h2>
                        
                        <p className="text-gray-700">
                            As a CEO and Full-Stack Architect, my focus is on **strategic technology adoption**. I don't just use tools; I master the right tools for scalable, maintainable, and high-performance applications.
                        </p>
                        
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center space-x-2"><span className="text-emerald-600 font-bold">✓</span> Expertise in the MERN Stack.</li>
                            <li className="flex items-center space-x-2"><span className="text-emerald-600 font-bold">✓</span> Strict adherence to TypeScript for type safety.</li>
                            <li className="flex items-center space-x-2"><span className="text-emerald-600 font-bold">✓</span> Cloud-native deployment via Docker and Vercel.</li>
                            <li className="flex items-center space-x-2"><span className="text-emerald-600 font-bold">✓</span> Focus on Lighthouse performance optimization.</li>
                        </ul>
                        
                        <Link href="/projects">
                            <button className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-emerald-700 transition duration-300">
                                See Skills in Action (Projects)
                            </button>
                        </Link>
                    </div>


                    <div className="md:col-span-2 space-y-10">
                        

                        <div>
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">Frontend & UI/UX</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <SkillItem icon="" name="React.js" description="Expert level component-based architecture and custom hooks." />
                                <SkillItem icon="" name="Next.js" description="Mastery of App Router, Server Components, and Routing strategies." />
                                <SkillItem icon="" name="Tailwind CSS" description="Highly efficient utility-first styling for complex, responsive designs." />
                                <SkillItem icon="" name="UI/UX Principles" description="Building interfaces focused on accessibility and intuitive user journeys." />
                            </div>
                        </div>


                        <div>
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">Backend & APIs</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <SkillItem icon="" name="Node.js & Express" description="Designing and implementing secure, high-throughput RESTful APIs." />
                                <SkillItem icon="" name="TypeScript" description="End-to-end type safety from database models to the frontend." />
                                <SkillItem icon="" name="Authentication" description="JWT implementation, OAuth 2.0 flows, and session management." />
                                <SkillItem icon="" name="WebSockets" description="Real-time communication for dynamic, interactive applications." />
                            </div>
                        </div>


                        <div>
                            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">Data, Testing & DevOps</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <SkillItem icon="" name="MongoDB" description="Advanced indexing, aggregation pipelines, and schema design." />
                                <SkillItem icon="" name="Docker" description="Containerization for consistent and reliable development and deployment." />
                                <SkillItem icon="" name="Git/GitHub" description="Complex branching strategies (Gitflow) and code reviews." />
                                <SkillItem icon="" name="Jest / React Testing" description="Unit, integration, and E2E testing for robust applications." />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SkillsPage;