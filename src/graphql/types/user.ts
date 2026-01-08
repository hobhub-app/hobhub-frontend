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
    profileImageUrl: string | null;
    profileDescription: string | null;
    createdAt: string;
    hobbies: {
      id: number;
      skillLevel: string;
      hobby: {
        id: number;
        name: string;
      };
    }[];
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

export type CompleteOnboardingInput = {
  dateOfBirth: Date;
  location: string;
  gender?: string | null;
  profileDescription?: string | null;
  profileImageUrl?: string | null;
  hobbies: {
    hobbyId: number;
    skillLevel?: string | null;
  }[];
};

export interface CompleteOnboardingResult {
  completeOnboarding: {
    id: number;
    age: number | null;
    location: string | null;
    profileImageUrl: string | null;
    profileDescription: string | null;
    hobbies: {
      id: number;
      skillLevel: string | null;
      hobby: {
        id: number;
        name: string;
      };
    }[];
  };
}
