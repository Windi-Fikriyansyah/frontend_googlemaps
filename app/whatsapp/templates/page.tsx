"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { MessageTemplate } from "@/types";
import {
    Layout,
    Plus,
    Trash2,
    MessageSquare,
    Save,
    X,
    FileText,
    ArrowLeft
} from "lucide-react";
import { Button, Input } from "@/components/ui/primitives";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<MessageTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newName, setNewName] = useState("");
    const [newContent, setNewContent] = useState("");
    const router = useRouter();

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const res = await api.get("/whatsapp/templates");
            setTemplates(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleCreate = async () => {
        if (!newName || !newContent) return;
        try {
            await api.post("/whatsapp/templates", {
                name: newName,
                content: newContent
            });
            setNewName("");
            setNewContent("");
            setIsCreating(false);
            fetchTemplates();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this template?")) return;
        try {
            await api.delete(`/whatsapp/templates/${id}`);
            fetchTemplates();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8 px-4 pb-12">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Message Templates</h1>
                        <p className="text-sm text-slate-500">Manage your WhatsApp broadcast templates</p>
                    </div>
                </div>

                <Button
                    onClick={() => setIsCreating(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Create Template
                </Button>
            </div>

            <div className="max-w-6xl mx-auto">
                {isCreating && (
                    <div className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900 rounded-2xl p-6 mb-8 shadow-lg shadow-blue-500/5 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold">New Template</h2>
                            <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Template Name</label>
                                <Input
                                    placeholder="e.g., Welcome Message"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Message Content</label>
                                <textarea
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[150px]"
                                    placeholder="Write your WhatsApp message here..."
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreate}>
                                    <Save className="w-4 h-4 mr-2" /> Save Template
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <Skeleton key={i} className="h-48 rounded-2xl" />)}
                    </div>
                ) : templates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map(template => (
                            <div key={template.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col hover:shadow-xl transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-slate-900 dark:text-white truncate pr-4">{template.name}</h3>
                                    <button
                                        onClick={() => handleDelete(template.id)}
                                        className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 flex-1 line-clamp-4 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
                                    {template.content}
                                </p>
                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                                    <span>Created {new Date(template.created_at).toLocaleDateString()}</span>
                                    <Button variant="ghost" size="sm" className="h-7 text-blue-600" onClick={() => {
                                        setNewName(template.name);
                                        setNewContent(template.content);
                                        setIsCreating(true);
                                    }}>Edit</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                        <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-400">No Templates Found</h3>
                        <p className="text-slate-500 text-sm mb-6">Create your first message template to start broadcasting</p>
                        <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Create First Template
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
