"use client";

import { useState } from "react";
import { Button, Input, Card, CardContent, CardHeader } from "./ui/primitives";
import { Search, MapPin, Gauge } from "lucide-react";

interface SearchFormProps {
    onSearch: (keyword: string, location: string, radius: number, max_results: number) => void;
    isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [radius, setRadius] = useState(5);
    const [maxResults, setMaxResults] = useState(20);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!keyword || !location) return;
        onSearch(keyword, location, radius, maxResults);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto mb-8 shadow-lg border-opacity-50">
            <CardHeader>
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Search className="w-5 h-5 text-blue-500" />
                    Find Business Leads
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Enter business type and location to generate leads from Google Maps.
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1.5">
                            Business Type
                        </label>
                        <Input
                            placeholder="e.g. Coffee Shop, Dentist"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-1.5">
                            Location
                        </label>
                        <div className="relative">
                            <Input
                                placeholder="e.g. Jakarta, London"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                            <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Results: <span className="font-bold text-blue-500">{maxResults}</span>
                        </label>
                        <select
                            value={maxResults}
                            onChange={(e) => setMaxResults(parseInt(e.target.value))}
                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950"
                        >
                            <option value={20}>20 Leads</option>
                            <option value={40}>40 Leads</option>
                            <option value={60}>60 Leads</option>
                            <option value={100}>100 Leads (Experimental)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">
                                Radius: <span className="font-bold text-blue-500">{radius} km</span>
                            </label>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            step="1"
                            value={radius}
                            onChange={(e) => setRadius(parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-blue-500 mt-2"
                        />
                    </div>

                    <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-2">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Scraping Data...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Search className="w-4 h-4" />
                                    Search Leads
                                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
