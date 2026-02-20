'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/apiService';
import Navbar from '@/components/Navbar';
import ItemList from '@/components/ItemList';

export default function Dashboard() {
    const { user, token, loading, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('tasks');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        if (!loading && !token) {
            router.push('/');
        }
    }, [loading, token, router]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const results = await apiService.search(searchQuery);
            setSearchResults(results);
        } else {
            setSearchResults(null);
        }
    };

    if (loading || !token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <Navbar user={user} onLogout={logout} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-3 rounded-2xl border-none bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-2 focus:ring-emerald-500 transition-all text-zinc-900 dark:text-zinc-50"
                                placeholder="Search tasks and posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </form>
                </div>

                {searchResults ? (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Search Results</h2>
                            <button
                                onClick={() => { setSearchQuery(''); setSearchResults(null); }}
                                className="text-emerald-600 hover:text-emerald-500 text-sm font-medium"
                            >
                                Clear Results
                            </button>
                        </div>
                        <ItemList items={searchResults} isSearch={true} />
                    </div>
                ) : (
                    <>
                        {/* Tabs */}
                        <div className="flex space-x-4 mb-8 border-b border-zinc-200 dark:border-zinc-800">
                            <button
                                className={`pb-4 px-2 text-sm font-medium transition-colors ${activeTab === 'tasks'
                                    ? 'border-b-2 border-emerald-500 text-emerald-600'
                                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                                onClick={() => setActiveTab('tasks')}
                            >
                                Tasks
                            </button>
                            <button
                                className={`pb-4 px-2 text-sm font-medium transition-colors ${activeTab === 'posts'
                                    ? 'border-b-2 border-emerald-500 text-emerald-600'
                                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                                    }`}
                                onClick={() => setActiveTab('posts')}
                            >
                                Posts
                            </button>
                        </div>

                        {activeTab === 'tasks' ? (
                            <ItemList type="task" />
                        ) : (
                            <ItemList type="post" />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
