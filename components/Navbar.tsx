'use client';

export default function Navbar({ user, onLogout }: any) {
    return (
        <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Dashy
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3 pr-4 border-r border-zinc-200 dark:border-zinc-800">
                            <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <span className="text-emerald-700 dark:text-emerald-400 text-sm font-bold uppercase">
                                    {user?.username?.[0] || 'U'}
                                </span>
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{user?.username}</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{user?.email}</p>
                            </div>
                        </div>

                        <button
                            onClick={onLogout}
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
