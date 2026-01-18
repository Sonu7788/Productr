import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState('home');

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-gray-50">
     
      <div className="w-64 bg-gray-900 text-gray-300 flex flex-col flex-shrink-0 transition-all duration-300">
        <div className="h-20 flex items-center px-8 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white tracking-tight">Productr</h1>
        </div>

        {/* Search in Sidebar */}
        <div className="px-6 py-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input 
              type="text" 
              className="w-full bg-gray-800 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600 placeholder-gray-500" 
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <button onClick={() => setTab('home')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${tab === 'home' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home
          </button>
          <button onClick={() => setTab('add-product')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${tab === 'add-product' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            Products
          </button>
        </nav>

        {/* User Profile Bottom */}
        <div className="p-4 border-t border-gray-800">
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Logout
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navbar (Optional based on screenshot, usually empty top bar) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-700">Dashboard</h2>
            <div className="flex items-center gap-4">
                 <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                 </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-grid-pattern p-8 relative">
            {/* Render Tabs conditionally */}
            {tab === 'home' ? <Home setTab={setTab} /> : <ProductForm setTab={setTab} />}
        </main>
      </div>
    </div>
  );
};

// Import sub-components (defined below in this file for single file copy-paste convenience, or separate them)
import Home from './Home';
import ProductForm from './ProductForm';

export default Dashboard;