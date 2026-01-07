export interface User {
  id: number;
  googleId?: string | null;
  email: string;
  firstname?: string | null;
  lastname?: string | null;
  age?: number | null;
  gender?: string | null;
  location?: string | null;
  profileImageUrl?: string | null;
  profileDescription?: string | null;
  createdAt: string;
}

export interface MeIdData {
  me: {
    id: number;
  };
}

export interface MeProfileData {
  me: {
    id: number;
    firstname: string | null;
    lastname: string | null;
    age: number | null;
    location: string | null;
    // NOTE: hobbies temporarily disabled, will be enforced when onboarding is implemented
    // hobbies: {
    //   id: number;
    //   hobby: {
    //     id: number;
    //     name: string;
    //   };
    // }[];
  };
}

export interface UserPreviewHobby {
  id: number;
  skillLevel: string;
  hobby: {
    id: number;
    name: string;
  };
}

export interface UserPreview {
  id: number;
  firstname: string | null;
  lastname: string | null;
  age: number | null;
  gender: string | null;
  location: string | null;
  profileImageUrl: string | null;
  profileDescription: string | null;
  createdAt: string;
  hobbies: UserPreviewHobby[];
}

export interface UsersData {
  browseUsers: UserPreview[];
}
export interface UserData {
  user: UserPreview;
}
