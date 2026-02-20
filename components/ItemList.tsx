'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService';
import TaskModal from './TaskModal';
import PostModal from './PostModal';

export default function ItemList({ type, items: propItems, isSearch }: any) {
    const [items, setItems] = useState<any[]>(propItems || []);
    const [loading, setLoading] = useState(!propItems);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    useEffect(() => {
        if (propItems) {
            setItems(propItems);
            setLoading(false);
        } else {
            fetchItems();
        }
    }, [type, propItems]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const data = type === 'task' ? await apiService.getTasks() : await apiService.getPosts();
            setItems(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleDelete = async (id: any) => {
        if (confirm('Are you sure you want to delete this item?')) {
            try {
                if (type === 'task') await apiService.deleteTask(id);
                else await apiService.deletePost(id);
                setItems(items.filter((item) => item.id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSave = () => {
        setShowTaskModal(false);
        setShowPostModal(false);
        setEditingItem(null);
        fetchItems();
    };

    if (loading) return <div className="text-center py-10 text-zinc-500">Loading...</div>;

    return (
        <div className="space-y-4">
            {!isSearch && (
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => type === 'task' ? setShowTaskModal(true) : setShowPostModal(true)}
                        className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add {type === 'task' ? 'Task' : 'Post'}
                    </button>
                </div>
            )}

            {items.length === 0 ? (
                <div className="text-center py-10 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-500">
                    No items found.
                </div>
            ) : (
                <div className="grid gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow relative group"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                        {item.title || item.display_text || 'Post'}
                                    </h3>
                                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                        {item.description || item.content || item.description || ''}
                                    </p>
                                    {item.status && (
                                        <span className={`mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'done' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                            {item.status}
                                        </span>
                                    )}
                                </div>
                                {!isSearch && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditingItem(item);
                                                type === 'task' ? setShowTaskModal(true) : setShowPostModal(true);
                                            }}
                                            className="p-1 text-zinc-400 hover:text-emerald-500 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 text-[10px] text-zinc-400">
                                {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showTaskModal && (
                <TaskModal
                    item={editingItem}
                    onClose={() => { setShowTaskModal(false); setEditingItem(null); }}
                    onSave={handleSave}
                />
            )}
            {showPostModal && (
                <PostModal
                    item={editingItem}
                    onClose={() => { setShowPostModal(false); setEditingItem(null); }}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
