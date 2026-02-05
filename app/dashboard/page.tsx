'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Task {
    id: string;
    title: string;
    description: string | null;
    status: string;
}

export default function DashboardPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/tasks');
            if (res.status === 401) {
                router.push('/login');
                return;
            }
            if (!res.ok) throw new Error('Failed to fetch tasks');
            const data = await res.json();
            setTasks(data.tasks);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });
            if (!res.ok) throw new Error('Failed to create task');
            setTitle('');
            setDescription('');
            fetchTasks();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete task');
            setTasks(tasks.filter((t) => t.id !== id));
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleLogout = async () => {
        // In a real app we would call an api to clear the cookie
        // For now we just redirect since cookie is httpOnly and we can't delete it from client easily 
        // without an API route. Let's redirect to a logout route or just login.
        // Ideally we should implement a /api/auth/logout.
        router.push('/login');
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Task Dashboard</h1>
                        </div>
                        <div className="flex items-center">
                            <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {error && <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">{error}</div>}

                <div className="mb-8 bg-white shadow sm:rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Create New Task</h2>
                    <form onSubmit={handleCreateTask} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Add Task
                        </button>
                    </form>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <li key={task.id} className="px-6 py-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                                    <p className="text-sm text-gray-500">{task.description}</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {task.status}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                        {tasks.length === 0 && (
                            <li className="px-6 py-4 text-center text-gray-500">No tasks found.</li>
                        )}
                    </ul>
                </div>
            </main>
        </div>
    );
}
