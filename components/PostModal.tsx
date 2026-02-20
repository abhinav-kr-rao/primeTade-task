'use client';

import { useState } from 'react';
import { apiService } from '@/services/apiService';

export default function PostModal({ item, onClose, onSave }: any) {
    const [content, setContent] = useState(item?.content || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (item) {
                await apiService.updatePost(item.id, { content });
            } else {
                await apiService.createPost({ content });
            }
            onSave();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden p-6 ring-1 ring-zinc-200 dark:ring-zinc-800">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
                    {item ? 'Edit Post' : 'New Post'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Content</label>
                        <textarea
                            required
                            className="mt-1 block w-full px-4 py-2 rounded-lg border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 text-sm h-32"
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end space-x-3 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
                        >
                            {item ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
