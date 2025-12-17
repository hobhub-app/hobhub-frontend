export interface User {
  user_id: number;
  google_id?: string;
  email: string;
  firstname?: string;
  lastname?: string;
  age?: number;
  gender?: string;
  location?: string;
  profile_image_url?: string;
  profile_description?: string;
  created_at: string;
}
