export interface Lead {
    id: number;
    google_place_id: string;
    name: string;
    address: string;
    phone?: string;
    website?: string;
    rating?: number;
    category?: string;
}

export interface SearchRequest {
    keyword: string;
    location_name: string;
    radius: number;
    max_results: number;
}

export interface SearchResponse {
    search_id: number;
    keyword: string;
    location_name: string;
    total_results: number;
    leads: Lead[];
}
