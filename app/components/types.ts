export interface Repository {
    name: string;
    description: string | null;
    language: string | null;
    created_at: string;
    pushed_at: string;
    html_url: string;
  }
  
  export interface RecentUser {
    id: string;
    userName: string;
    avatarUrl: string;
    name: string;
    login: string;
    location: string;
  }