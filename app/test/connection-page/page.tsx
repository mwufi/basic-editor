import React from 'react';
import { Search, Bell, ChevronDown, Plus, ChevronRight } from 'lucide-react';

const Header = () => (
    <header className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center space-x-8">
            <img src="/api/placeholder/32/32" alt="Twisty logo" className="w-8 h-8" />
            <nav className="flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Messages</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Discover</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Wallet</a>
                <a href="#" className="text-gray-700 hover:text-gray-900">Projects</a>
            </nav>
        </div>
        <div className="flex items-center space-x-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Enter your search request..."
                    className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Bell size={20} />
            </button>
            <img src="/api/placeholder/32/32" alt="User avatar" className="w-8 h-8 rounded-full" />
        </div>
    </header>
);

const IncomeTracker = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Income Tracker</h2>
            <button className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-md">
                <span>Week</span>
                <ChevronDown size={16} />
            </button>
        </div>
        <p className="text-gray-500 mb-6">Track changes in income over time and access detailed data on each project and payments received</p>
        <div className="flex justify-between items-end mb-4">
            <div>
                <span className="text-4xl font-bold">+20%</span>
                <p className="text-sm text-gray-500">This week's income is higher than last week's</p>
            </div>
            <span className="text-2xl font-bold">$2,567</span>
        </div>
        {/* Placeholder for the chart */}
        <div className="h-32 bg-gray-100 rounded-lg mb-4"></div>
        <div className="flex justify-between">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 2 ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
                    {day}
                </div>
            ))}
        </div>
    </div>
);

const ProjectCard = ({ title, rate, status, description, location, time }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg"></div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-gray-500">${rate}/hour</p>
                </div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <div className="flex items-center text-sm text-gray-500">
            <span>{location}</span>
            <span className="mx-2">•</span>
            <span>{time}</span>
        </div>
    </div>
);

const RecentProjects = () => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Recent Projects</h2>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">See all Project</a>
        </div>
        <ProjectCard
            title="Web Development Project"
            rate={10}
            status="Paid"
            description="This project involves implementing both frontend and backend functionalities, as well as integrating with third-party APIs."
            location="Germany"
            time="2h ago"
        />
        <ProjectCard
            title="Copyright Project"
            rate={10}
            status="Not Paid"
            description=""
            location=""
            time=""
        />
        <ProjectCard
            title="Web Design Project"
            rate={10}
            status="Paid"
            description=""
            location=""
            time=""
        />
    </div>
);

const ConnectionCard = ({ name, role, level }) => (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm mb-3">
        <div className="flex items-center space-x-3">
            <img src="/api/placeholder/40/40" alt={name} className="w-10 h-10 rounded-full" />
            <div>
                <h3 className="font-semibold">{name}</h3>
                <p className="text-sm text-gray-500">{role}</p>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${level === 'Senior' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                {level}
            </span>
            <button className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                <Plus size={16} />
            </button>
        </div>
    </div>
);

const LetsConnect = () => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Let's Connect</h2>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">See all</a>
        </div>
        <ConnectionCard name="Randy Gouse" role="Cybersecurity specialist" level="Senior" />
        <ConnectionCard name="Giana Schleifer" role="UX/UI Designer" level="Middle" />
    </div>
);

const UnlockPremium = () => (
    <div className="bg-gray-200 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Unlock Premium Features</h2>
        <p className="text-sm text-gray-600 mb-4">Get access to exclusive benefits and expand your freelancing opportunities</p>
        <button className="flex items-center justify-between w-full bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50">
            <span>Upgrade now</span>
            <ChevronRight size={20} />
        </button>
    </div>
);

const ProposalProgress = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Proposal Progress</h2>
            <button className="flex items-center space-x-1 text-sm text-gray-500">
                <span>April 11, 2024</span>
                <ChevronDown size={16} />
            </button>
        </div>
        <div className="flex justify-between text-center">
            <div>
                <h3 className="text-2xl font-bold">64</h3>
                <p className="text-sm text-gray-500">Proposals sent</p>
            </div>
            <div>
                <h3 className="text-2xl font-bold text-orange-500">12</h3>
                <p className="text-sm text-gray-500">Interviews</p>
            </div>
            <div>
                <h3 className="text-2xl font-bold">10</h3>
                <p className="text-sm text-gray-500">Hires</p>
            </div>
        </div>
    </div>
);

const Dashboard = () => (
    <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <IncomeTracker />
                    <RecentProjects />
                </div>
                <div className="space-y-8">
                    <LetsConnect />
                    <UnlockPremium />
                    <ProposalProgress />
                </div>
            </div>
        </main>
    </div>
);

export default Dashboard;