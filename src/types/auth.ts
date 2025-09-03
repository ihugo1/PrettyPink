export interface User {
  id: string;
  email: string;
  user_metadata?: {
     avatar_url?: string;
    email?: string;
    email_verified?: boolean;
    full_name?: string;
    iss?: string;
    name?: string;
     picture?: string;
    provider_id?: string;
    sub?: string;
     [key: string]: any;
  };
  [key: string]: any;
}

export interface Session {
  user: User;
  access_token: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}
