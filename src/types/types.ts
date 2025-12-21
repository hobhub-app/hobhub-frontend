export interface User {
  id: number;
  googleId?: string;
  email: string;
  firstname?: string;
  lastname?: string;
  age?: number;
  gender?: string;
  location?: string;
  profileImageUrl?: string;
  profileDescription?: string;
  createdAt: string;
}
